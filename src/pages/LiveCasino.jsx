import { useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import { LayoutContext } from "../components/LayoutContext";
import { callApi } from "../utils/Utils";
import LiveGameCard from "/src/components/LiveGameCard";
import ProviderContainer from "../components/ProviderContainer";
import LiveMenuProvider from "../components/LiveMenuProvider";
import GameModal from "../components/GameModal";
import DivLoading from "../components/DivLoading";
import GamesLoading from "../components/GamesLoading";
import SearchInput from "../components/SearchInput";
import LoginModal from "../components/LoginModal";
import CustomAlert from "../components/CustomAlert";
import SprintModal from "../components/SprintModal";
import "animate.css";
import "../css/Live-casino.css";

let selectedGameId = null;
let selectedGameType = null;
let selectedGameLauncher = null;
let selectedGameName = null;
let pageCurrent = 0;


const LiveCasino = () => {
  const pageTitle = "Casino En Vivo";
  const { contextData } = useContext(AppContext);
  const { isLogin } = useContext(LayoutContext);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [pageData, setPageData] = useState({});
  const [gameUrl, setGameUrl] = useState("");
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [txtSearch, setTxtSearch] = useState("");
  const [searchDelayTimer, setSearchDelayTimer] = useState();
  const [messageCustomAlert, setMessageCustomAlert] = useState(["", ""]);
  const [shouldShowGameModal, setShouldShowGameModal] = useState(false);
  const [showSprintModal, setShowSprintModal] = useState(false);
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
    setShowSprintModal(true);

    getPage("livecasino");

    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getPage = (page) => {
    setIsLoadingGames(true);
    setCategories([]);
    setGames([]);
    callApi(contextData, "GET", "/get-page?page=" + page, callbackGetPage, null);
  };

  const callbackGetPage = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      setCategories(result.data.categories);
      setSelectedProvider(null);
      setPageData(result.data);      

      if (pageData.url && pageData.url != null) {
        if (contextData.isMobile) {
          // Mobile sports workaround
        }
      } else {
        if (result.data.page_group_type == "categories") {
          setSelectedCategoryIndex(0);
        }
        if (result.data.page_group_type == "games") {
          loadMoreContent();
        }
      }
      pageCurrent = 0;
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      const urlParams = new URLSearchParams(location.search);
      const providerName = urlParams.get('provider');
      const providerId = urlParams.get('providerId');

      if (providerName && providerId) {
        const provider = categories.find(cat => cat.id.toString() === providerId.toString());
        if (provider) {
          const providerIndex = categories.indexOf(provider);
          setSelectedProvider(provider);
          setActiveCategory(provider);
          setSelectedCategoryIndex(providerIndex);
          fetchContent(provider, provider.id, provider.table_name, providerIndex, true);
          return;
        }
      }

      let item = categories[0];
      fetchContent(item, item.id, item.table_name, 0, false);
      setActiveCategory(item);
    }
  }, [categories, location.search]);

  const loadMoreContent = () => {
    let item = categories[selectedCategoryIndex];
    if (item) {
      fetchContent(item, item.id, item.table_name, selectedCategoryIndex, false);
    }
  };

  const fetchContent = (category, categoryId, tableName, categoryIndex, resetCurrentPage) => {
    let pageSize = 30;
    setIsLoadingGames(true);

    if (resetCurrentPage == true) {
      pageCurrent = 0;
      setGames([]);
    }

    setActiveCategory(category);
    setSelectedCategoryIndex(categoryIndex);
    setTxtSearch("");

    let apiUrl = "/get-content?page_group_type=categories&page_group_code=" +
      pageData.page_group_code +
      "&table_name=" +
      tableName +
      "&apigames_category_id=" +
      categoryId +
      "&page=" +
      pageCurrent +
      "&length=" +
      pageSize;

    if (selectedProvider && selectedProvider.id) {
      apiUrl += "&provider=" + selectedProvider.id;
    }

    callApi(
      contextData,
      "GET",
      apiUrl,
      callbackFetchContent,
      null
    );
  };

  const callbackFetchContent = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      if (pageCurrent == 0) {
        configureImageSrc(result);
        setGames(result.content);
      } else {
        configureImageSrc(result);
        setGames([...games, ...result.content]);
      }
      pageCurrent += 1;
    }
    setIsLoadingGames(false);
  };

  const configureImageSrc = (result) => {
    (result.content || []).forEach((element) => {
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

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSelectedProvider(category);
    setTxtSearch("");
  }

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

    if (keyword == "") {
      return;
    }

    setGames([]);
    setIsLoadingGames(true);

    let pageSize = 20;

    let searchDelayTimerTmp = setTimeout(function () {
      callApi(
        contextData,
        "GET",
        "/search-content?keyword=" + txtSearch + "&page_group_code=" + pageData.page_group_code + "&length=" + pageSize,
        callbackSearch,
        null
      );
    }, 1000);

    setSearchDelayTimer(searchDelayTimerTmp);
  };

  const callbackSearch = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      configureImageSrc(result, true);
      setGames(result.content);
      pageCurrent = 0;
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
      <SprintModal
        isOpen={showSprintModal}
        onClose={() => setShowSprintModal(false)}
      />

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
          <div className="container-fluid provider-container live-provider">
            {
              categories.length > 0 ? <ProviderContainer
                categories={categories}
                selectedCategoryIndex={selectedCategoryIndex}
                onCategoryClick={fetchContent}
                onCategorySelect={handleCategorySelect}
                pageType="casino"
              /> : <DivLoading />
            }
          </div>
          <LiveMenuProvider />

          <div className="container-provider">
            <div className="botton-header-slots">
              <SearchInput
                txtSearch={txtSearch}
                setTxtSearch={setTxtSearch}
                searchRef={searchRef}
                search={search}
                contextData={contextData}
                pageData={pageData}
                setGames={setGames}
                setIsLoadingGames={setIsLoadingGames}
                callbackSearch={callbackSearch}
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
            {!isLoadingGames && games.length >= 20 && (
              <div className="text-center">
                <a onClick={loadMoreContent}>
                  <button className="load_more">Ver más</button>
                </a>
              </div>
            )}
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

export default LiveCasino;