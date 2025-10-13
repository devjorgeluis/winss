import { useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import { LayoutContext } from "../components/LayoutContext";
import { callApi } from "../utils/Utils";
import LiveGameCard from "/src/components/LiveGameCard";
import HalloweenSlideshow from "../components/HalloweenSlideshow";
import GameModal from "../components/GameModal";
import GamesLoading from "../components/GamesLoading";
import SearchInput from "../components/SearchInput";
import LoginModal from "../components/LoginModal";
import CustomAlert from "../components/CustomAlert";
import "animate.css";
import "../css/Halloween.css";

let selectedGameId = null;
let selectedGameType = null;
let selectedGameLauncher = null;
let selectedGameName = null;
let pageCurrent = 0;


const Halloween = () => {
  const pageTitle = "Halloween";
  const { contextData } = useContext(AppContext);
  const { isLogin } = useContext(LayoutContext);
  const [games, setGames] = useState([]);
  const [gameUrl, setGameUrl] = useState("");
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [txtSearch, setTxtSearch] = useState("");
  const [searchDelayTimer, setSearchDelayTimer] = useState();
  const [messageCustomAlert, setMessageCustomAlert] = useState(["", ""]);
  const [shouldShowGameModal, setShouldShowGameModal] = useState(false);
  const refGameModal = useRef();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    selectedGameId = null;
    selectedGameType = null;
    selectedGameLauncher = null;
    selectedGameName = null;
    setGameUrl("");
    setShouldShowGameModal(false);
    fetchContent();

    window.scrollTo(0, 0);
  }, [location.pathname]);

  const fetchContent = () => {
    setIsLoadingGames(true);
    setTxtSearch("");

    let apiUrl = "/get-top-category-content?group=Hallowen_Button";

    callApi(
      contextData,
      "GET",
      apiUrl,
      callbackFetchContent,
      null
    );
  };

  const configureImageSrc = (result) => {
    (result.data || []).forEach((element) => {
      let imageDataSrc = element.image_url;
      if (element.image_local != null) {
        imageDataSrc = contextData.cdnUrl + element.image_local;
      }
      element.imageDataSrc = imageDataSrc;
    });
  };

  const launchGame = (game, type, launcher) => {
    setShouldShowGameModal(true);
    selectedGameId = game.id != null ? game.id : selectedGameId;
    selectedGameType = type != null ? type : selectedGameType;
    selectedGameLauncher = launcher != null ? launcher : selectedGameLauncher;
    selectedGameName = game?.name;
    callApi(contextData, "GET", "/get-game-url?game_id=" + selectedGameId, callbackLaunchGame, null);
  };

  const callbackLaunchGame = (result) => {
    if (result.status == "0") {
      switch (selectedGameLauncher) {
        case "modal":
        case "tab":
          setGameUrl(result.url);
          break;
      }
    } else if (result.status == "500" || result.status == "422") {
      setMessageCustomAlert(["error", result.message]);
    }
  };

  const closeGameModal = () => {
    selectedGameId = null;
    selectedGameType = null;
    selectedGameLauncher = null;
    selectedGameName = null;
    setGameUrl("");
    setShouldShowGameModal(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginConfirm = () => {
    setShowLoginModal(false);
  };

  const handleAlertClose = () => {
    setMessageCustomAlert(["", ""]);
  };

  const search = (e) => {
    let keyword = e.target.value;
    setTxtSearch(keyword);

    if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
      let keyword = e.target.value;
      do_search(keyword);
    } else {
      if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        e.keyCode == 8 ||
        e.keyCode == 46
      ) {
        do_search(keyword);
      }
    }

    if (e.key === "Enter" || e.keyCode === 13 || e.key === "Escape" || e.keyCode === 27) {
      searchRef.current?.blur();
    }
  };

  const do_search = (keyword) => {
    clearTimeout(searchDelayTimer);

    if (keyword === "") {
      setGames(originalGames);
      setIsLoadingGames(false);
      return;
    }

    setIsLoadingGames(true);

    let searchDelayTimerTmp = setTimeout(function () {
      const filteredGames = originalGames.filter(game => 
        game.name.toLowerCase().includes(keyword.toLowerCase())
      );
      setGames(filteredGames);
      setIsLoadingGames(false);
    }, 300);

    setSearchDelayTimer(searchDelayTimerTmp);
  };

  const [originalGames, setOriginalGames] = useState([]);

  const callbackFetchContent = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      if (pageCurrent == 0) {
        configureImageSrc(result);
        setGames(result.data);
        setOriginalGames(result.data);
      } else {
        configureImageSrc(result);
        setGames([...games, ...result.data]);
        setOriginalGames([...originalGames, ...result.data]);
      }
      pageCurrent += 1;
    }
    setIsLoadingGames(false);
  };

  return (
    <>
      <CustomAlert message={messageCustomAlert} onClose={handleAlertClose} />
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onConfirm={handleLoginConfirm}
        />
      )}
      {shouldShowGameModal && selectedGameId !== null ? (
        <GameModal
          gameUrl={gameUrl}
          reload={launchGame}
          launchInNewTab={() => launchGame(null, null, "tab")}
          ref={refGameModal}
          onClose={closeGameModal}
        />
      ) : (
        <>
          <HalloweenSlideshow />
          <div className="container-provider">
            <div className="botton-header-slots">
              <strong>TOP HALLOWEEN</strong>
              <SearchInput
                txtSearch={txtSearch}
                setTxtSearch={setTxtSearch}
                searchRef={searchRef}
                search={search}
                contextData={contextData}
                pageData=""
                setGames={setGames}
                setIsLoadingGames={setIsLoadingGames}
                callbackSearch=""
                searchDelayTimer={searchDelayTimer}
                setSearchDelayTimer={setSearchDelayTimer}
              />
            </div>

            <div className="container-games">
              {games &&
                games.map((item, index) => {
                  let imageDataSrc = item.image_url;
                  if (item.image_local != null) {
                    imageDataSrc = contextData.cdnUrl + item.image_local;
                  }
                  return (
                    <LiveGameCard
                      key={index}
                      id={item.id}
                      title={item.name}
                      imageSrc={imageDataSrc}
                      onClick={() =>
                        isLogin
                          ? launchGame(item, "slot", "tab")
                          : handleLoginClick()
                      }
                    />
                  );
                })
              }
            </div>

            {isLoadingGames && <GamesLoading />}
            {!isLoadingGames && games.length === 0 && (
              <div className="no-results">
                <p>SIN RESULTADOS</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Halloween;
