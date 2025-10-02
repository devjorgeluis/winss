import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import { LayoutContext } from "../components/LayoutContext";
import { NavigationContext } from "../components/NavigationContext";
import { callApi, callApiService } from "../utils/Utils";
import GameCard from "/src/components/GameCard";
import NavLinkIcon from "../components/NavLinkIcon";
import JackpotContainer from "../components/JackpotContainer";
import Slideshow from "../components/Slideshow";
import CategorySlideshow from "../components/CategorySlideshow";
import TopGameSlideshow from "../components/TopGameSlideshow";
import GameModal from "../components/GameModal";
import DivLoading from "../components/DivLoading";
import GamesLoading from "../components/GamesLoading";
import SearchInput from "../components/SearchInput";
import LoginModal from "../components/LoginModal";
import CustomAlert from "../components/CustomAlert";
import "animate.css";
import ImgBanner1 from "/src/assets/img/banner-quinielas-1500x300.png";
import ImgBanner2 from "/src/assets/img/banner-1.jpeg";
import ImgBanner3 from "/src/assets/img/banner-2.jpeg";
import ImgBanner4 from "/src/assets/img/banner-3.jpeg";
import ImgBanner5 from "/src/assets/img/banner-4.jpeg";
import VideoBanner1 from "/src/assets/video/tadavideo.mp4";
import VideoBanner2 from "/src/assets/video/triplecherry.webm";
import ImgBanner6 from "/src/assets/img/sprintgames.jpg";
import ImgBanner7 from "/src/assets/img/aviatrix-01.png";
import ImgBanner8 from "/src/assets/img/slots-6.jpeg";
import ImgBanner9 from "/src/assets/img/aviatrix-02.png";
import ImgBanner10 from "/src/assets/img/slots-4.jpeg";
import ImgBanner11 from "/src/assets/img/aviatrix-03.png";

import ImgMobileBanner1 from "/src/assets/img/aviatrix-01-mobile.png";
import ImgMobileBanner2 from "/src/assets/img/aviatrix-03-mobile.png";
import ImgMobileBanner3 from "/src/assets/img/aviatrix-02-mobile.png";

import ImgLobby from "/src/assets/svg/lobby.svg";
import ImgJoker from "/src/assets/img/jokers.png";
import ImgHot from "/src/assets/img/supercaliente.png";
import ImgRoulette from "/src/assets/svg/roulette.svg";
import ImgCrash from "/src/assets/svg/hability.svg";
import ImgMegaways from "/src/assets/svg/megaways.svg";


let selectedGameId = null;
let selectedGameType = null;
let selectedGameLauncher = null;
let pageCurrent = 0;


const Casino = () => {
  const pageTitle = "Casino";
  const { contextData } = useContext(AppContext);
  const { isLogin } = useContext(LayoutContext);
  const { setShowFullDivLoading } = useContext(NavigationContext);
  const [selectedPage, setSelectedPage] = useState("casino");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [games, setGames] = useState([]);
  const [topSlot, setTopSlot] = useState([]);
  const [topLiveCasino, setTopLiveCasino] = useState([]);
  const [topHot, setTopHot] = useState([]);
  const [topArcade, setTopArcade] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});
  const [pageData, setPageData] = useState({});
  const [gameUrl, setGameUrl] = useState("");
  const [fragmentNavLinksBody, setFragmentNavLinksBody] = useState(<></>);
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [txtSearch, setTxtSearch] = useState("");
  const [searchDelayTimer, setSearchDelayTimer] = useState();
  const [messageCustomAlert, setMessageCustomAlert] = useState(["", ""]);
  const [shouldShowGameModal, setShouldShowGameModal] = useState(false);
  const refGameModal = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  let imageSlideshow = isMobile ? [
    { type: "image", url: ImgBanner1 },
    { type: "image", url: ImgBanner2 },
    { type: "image", url: ImgBanner3 },
    { type: "image", url: ImgBanner4 },
    { type: "image", url: ImgBanner5 },
    { type: "video", url: VideoBanner1 },
    { type: "video", url: VideoBanner2 },
    { type: "image", url: ImgBanner6 },
    { type: "image", url: ImgMobileBanner1 },
    { type: "image", url: ImgMobileBanner2 },
    { type: "image", url: ImgMobileBanner3 },
    { type: "image", url: ImgMobileBanner1 },
    { type: "image", url: ImgMobileBanner2 },
  ] : [
    { type: "image", url: ImgBanner1 },
    { type: "image", url: ImgBanner2 },
    { type: "image", url: ImgBanner3 },
    { type: "image", url: ImgBanner4 },
    { type: "image", url: ImgBanner5 },
    { type: "video", url: VideoBanner1 },
    { type: "video", url: VideoBanner2 },
    { type: "image", url: ImgBanner6 },
    { type: "image", url: ImgBanner7 },
    { type: "image", url: ImgBanner8 },
    { type: "image", url: ImgBanner9 },
    { type: "image", url: ImgBanner10 },
    { type: "image", url: ImgBanner11 },
  ]

  useEffect(() => {
    const checkIsMobile = () => {
      return window.innerWidth <= 767;
    };

    setIsMobile(checkIsMobile());

    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    selectedGameId = null;
    selectedGameType = null;
    selectedGameLauncher = null;
    setGameUrl("");
    setShouldShowGameModal(false);

    setSelectedPage("casino");
    getPage("casino");
    getStatus();

    window.scrollTo(0, 0);
  }, [location.pathname]);


  useEffect(() => {
    updateNavLinks();
  }, [selectedPage]);

  const updateNavLinks = () => {
    if ((contextData.slots_only == null) || (contextData.slots_only == false)) {
      setFragmentNavLinksBody(
        <>
          <NavLinkIcon
            title="Lobby"
            pageCode="home"
            icon={ImgLobby}
            active={selectedPage === "casino"}
            onClick={() => getPage("casino")}
          />
          <NavLinkIcon
            title="Jokers"
            pageCode="joker"
            icon={ImgJoker}
            active={selectedPage === "joker"}
            onClick={() => getSubPage("joker")}
          />
          <NavLinkIcon
            title="Supercaliente"
            pageCode="hot"
            icon={ImgHot}
            active={selectedPage === "hot"}
            onClick={() => getSubPage("hot")}
          />
          <NavLinkIcon
            title="Ruletas"
            pageCode="roulette"
            icon={ImgRoulette}
            active={selectedPage === "roulette"}
            onClick={() => getSubPage("roulette")}
          />
          <NavLinkIcon
            title="Megaways"
            pageCode="megaways"
            icon={ImgMegaways}
            active={selectedPage === "megaways"}
            onClick={() => getSubPage("megaways")}
          />
          <NavLinkIcon
            title="Habilidad"
            pageCode="arcade"
            icon={ImgCrash}
            active={selectedPage === "arcade"}
            onClick={() => getSubPage("arcade")}
          />
        </>
      );
    } else {
      setFragmentNavLinksBody(
        <>
          <NavLinkIcon
            title="Lobby"
            pageCode="home"
            icon={ImgLobby}
            active={selectedPage === "casino"}
            onClick={() => getPage("casino")}
          />
          <NavLinkIcon
            title="Jokers"
            pageCode="joker"
            icon={ImgJoker}
            active={selectedPage === "joker"}
            onClick={() => getSubPage("joker")}
          />
          <NavLinkIcon
            title="Supercaliente"
            pageCode="hot"
            icon={ImgHot}
            active={selectedPage === "hot"}
            onClick={() => getSubPage("hot")}
          />
          <NavLinkIcon
            title="Megaways"
            pageCode="megaways"
            icon={ImgMegaways}
            active={selectedPage === "megaways"}
            onClick={() => getSubPage("megaways")}
          />
        </>
      );
    }
  };

  const getStatus = () => {
    callApi(contextData, "GET", "/get-status", callbackGetStatus, null);
  };

  const callbackGetStatus = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      setIsLoadingGames(false);
      setTopSlot(result.top_slot);
      setTopLiveCasino(result.top_livecasino);
      setTopHot(result.top_hot);
      setTopArcade(result.top_arcade);
    }
  };

  const getPage = (page) => {
    setIsLoadingGames(true);
    setCategories([]);
    setGames([]);
    setSelectedPage(page);
    callApi(contextData, "GET", "/get-page?page=" + page, callbackGetPage, null);
  };

  const callbackGetPage = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      setCategories(result.data.categories);
      setPageData(result.data);

      if (result.data.menu === "casino") {
        setMainCategories(result.data.categories);
        setActiveCategory({});
      }

      if (result.data.page_group_type === "categories" && result.data.categories.length > 0) {
        const firstCategory = result.data.categories[0];
        setSelectedCategoryIndex(0);
        // setActiveCategory(firstCategory);
        fetchContent(firstCategory, firstCategory.id, firstCategory.table_name, 0, true, result.data.page_group_code);
      } else if (result.data.page_group_type === "games") {
        loadMoreContent();
      }

      pageCurrent = 0;
    }
    setIsLoadingGames(false);
  };

  const getSubPage = (page) => {
    setIsLoadingGames(true);
    setGames([]);
    setSelectedPage(page);
    callApi(contextData, "GET", "/get-page?page=" + page, callbackGetSubPage, null);
  };

  const callbackGetSubPage = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      setPageData(result.data);
      setActiveCategory({});

      if (result.data.page_group_type === "categories") {
        setCategories(result.data.categories)
      }

      if (result.data.page_group_type === "games") {
        if (mainCategories && mainCategories.length > 0) {
          setCategories(mainCategories);
        } else {
          callApi(contextData, "GET", "/get-page?page=home", (homeResult) => {
            if (homeResult.data && homeResult.data.categories) {
              setMainCategories(homeResult.data.categories);
              setCategories(homeResult.data.categories);
            }
          }, null);
        }
      }

      if (result.data.categories && result.data.categories.length > 0) {
        let item = result.data.categories[0];
        fetchContent(item, item.id, item.table_name, 0, true, result.data.page_group_code);
      }
    }
  };

  const loadMoreContent = () => {
    let item = categories[selectedCategoryIndex];
    if (item) {
      fetchContent(item, item.id, item.table_name, selectedCategoryIndex, false);
    }
  };

  const fetchContent = (category, categoryId, tableName, categoryIndex, resetCurrentPage, pageGroupCode) => {
    let pageSize = 30;
    setIsLoadingGames(true);

    if (resetCurrentPage == true) {
      pageCurrent = 0;
      setGames([]);
    }

    // setActiveCategory(category);
    setSelectedCategoryIndex(categoryIndex);
    setTxtSearch("");

    const groupCode = pageGroupCode || pageData.page_group_code;

    let apiUrl = "/games/?page_group_type=categories&page_group_code=" +
      groupCode +
      "&table_name=" +
      tableName +
      "&apigames_category_id=" +
      categoryId +
      "&page=" +
      pageCurrent +
      "&length=" +
      pageSize;

    callApiService(
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
        setGames(result.data);
      } else {
        configureImageSrc(result);
        setGames([...games, ...result.data]);
      }
      pageCurrent += 1;
    }
    setIsLoadingGames(false);
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

  const launchGame = (id, type, launcher) => {
    setShouldShowGameModal(true);
    setShowFullDivLoading(true);
    selectedGameId = id != null ? id : selectedGameId;
    selectedGameType = type != null ? type : selectedGameType;
    selectedGameLauncher = launcher != null ? launcher : selectedGameLauncher;
    callApi(contextData, "GET", "/get-game-url?game_id=" + selectedGameId, callbackLaunchGame, null);
  };

  const callbackLaunchGame = (result) => {
    setShowFullDivLoading(false);
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
          <JackpotContainer />
          <Slideshow images={imageSlideshow} />

          <div className="container-fluid provider-container">
            {fragmentNavLinksBody}
          </div>

          {
            categories.length > 0 ? <CategorySlideshow
              categories={categories}
              selectedCategoryIndex={selectedCategoryIndex}
              onCategoryClick={fetchContent}
              onCategorySelect={handleCategorySelect}
              pageType="casino"
            /> : <DivLoading />
          }

          <div className="container-provider">
            {
              (activeCategory && activeCategory.name && activeCategory.name !== "") ?
                <>
                  <div className="botton-header-slots">
                    <strong>{activeCategory && activeCategory.name}</strong>
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
                          <GameCard
                            key={index}
                            id={item.id}
                            title={item.name}
                            imageSrc={imageDataSrc}
                            onClick={() =>
                              isLogin
                                ? launchGame(item.id, "slot", "tab")
                                : handleLoginClick()
                            }
                          />
                        );
                      })
                    }
                  </div>
                  {!isLoadingGames && games.length >= 20 && (
                    <div className="text-center">
                      <a onClick={loadMoreContent}>
                        <button className="load_more">See more</button>
                      </a>
                    </div>
                  )}
                  {!isLoadingGames && games.length === 0 && (
                    <div className="no-results">
                      <p>SIN RESULTADOS</p>
                    </div>
                  )}
                </>
                : selectedPage === "casino" ? <>
                  <div className="col-12 home-title">
                    <h3>
                      <div className="title">Los Mejores Juegos</div>
                    </h3>
                  </div>

                  <TopGameSlideshow games={topSlot} isLogin={isLogin} handleLoginClick={handleLoginClick} />
                  <TopGameSlideshow games={topLiveCasino} isLogin={isLogin} handleLoginClick={handleLoginClick} />
                  <TopGameSlideshow games={topHot} isLogin={isLogin} handleLoginClick={handleLoginClick} />
                  <TopGameSlideshow games={topArcade} isLogin={isLogin} handleLoginClick={handleLoginClick} />
                </>
                :
                <>
                  <div className="botton-header-slots">
                    <strong>{activeCategory && activeCategory.name}</strong>
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
                          <GameCard
                            key={index}
                            id={item.id}
                            title={item.name}
                            imageSrc={imageDataSrc}
                            onClick={() =>
                              isLogin
                                ? launchGame(item.id, "slot", "tab")
                                : handleLoginClick()
                            }
                          />
                        );
                      })
                    }
                  </div>
                  {!isLoadingGames && games.length >= 20 && (
                    <div className="text-center">
                      <a onClick={loadMoreContent}>
                        <button className="load_more">See more</button>
                      </a>
                    </div>
                  )}
                  {!isLoadingGames && games.length === 0 && (
                    <div className="no-results">
                      <p>SIN RESULTADOS</p>
                    </div>
                  )}
                </>
            }

            {isLoadingGames && <GamesLoading />}
          </div>
        </>
      )}
    </>
  );
};

export default Casino;
