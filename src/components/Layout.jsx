import { useContext, useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { LayoutContext } from "./LayoutContext";
import { callApi } from "../utils/Utils";
import Header from "./Header";
import Footer from "./Footer";
import NavLinkHeader from "../components/NavLinkHeader";
import LoginModal from "./LoginModal";
import LogoutConfirmModal from "./LogoutConfirmModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { NavigationContext } from "./NavigationContext";
import ImgPumpkin from "/src/assets/img/pumpkin.png";

const Layout = () => {
    const { contextData } = useContext(AppContext);
    const [selectedPage, setSelectedPage] = useState("lobby");
    const [isLogin, setIsLogin] = useState(contextData.session !== null);
    const [isMobile, setIsMobile] = useState(() => {
        return typeof window !== 'undefined' ? window.innerWidth <= 767 : false;
    });
    const [userBalance, setUserBalance] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [fragmentNavLinksTop, setFragmentNavLinksTop] = useState(<></>);
    const [isSlotsOnly, setIsSlotsOnly] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    const isCasino = location.pathname === "/casino";
    const isLiveCasino = location.pathname === "/live-casino";
    const isHalloween = location.pathname === "/halloween";
    const isCrash = location.pathname === "/crash";
    const isSport = location.pathname === "/sports";
    const isAuth = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/profile/history" || location.pathname === "/profile/edit" || location.pathname === "/profile/change-password";

    useEffect(() => {
        const checkIsMobile = () => {
            return window.innerWidth <= 767;
        };

        setIsMobile(checkIsMobile());

        const handleResize = () => {
            setIsMobile(checkIsMobile());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (contextData.session != null) {
            setIsLogin(true);
            if (contextData.session.user && contextData.session.user.balance) {
                setUserBalance(contextData.session.user.balance);
            }
        }
        getStatus();
    }, [contextData.session]);

    useEffect(() => {
        updateNavigation();
    }, [isMobile, isSlotsOnly]);

    const updateNavigation = () => {
        if (isSlotsOnly === "") return;

        if (isSlotsOnly === "false") {
            setFragmentNavLinksTop(
                !isMobile ?
                <>
                    <NavLinkHeader
                        title="Slots"
                        pageCode="casino"
                        icon=""
                        getPage={getPage}
                    />
                    <NavLinkHeader
                        title="Halloween"
                        pageCode="halloween"
                        icon={ImgPumpkin}
                        getPage={getPage}
                    />
                    <NavLinkHeader
                        title="Casino En Vivo"
                        pageCode="live-casino"
                        icon=""
                        getPage={getPage}
                    />
                    <NavLinkHeader
                        title="+Juegos"
                        pageCode="#"
                        icon=""
                        getPage={getPage}
                    />
                </> :
                <>
                    <NavLinkHeader
                        title="Slots"
                        pageCode="casino"
                        icon=""
                        getPage={getPage}
                    />
                    <NavLinkHeader
                        title="Halloween"
                        pageCode="halloween"
                        icon={ImgPumpkin}
                        getPage={getPage}
                    />
                    <NavLinkHeader
                        title="+Juegos"
                        pageCode="#"
                        icon=""
                        getPage={getPage}
                    />
                </>
            );
        } else if (isSlotsOnly === "true") {
            setFragmentNavLinksTop(
                <>
                    <NavLinkHeader
                        title="Slots"
                        pageCode="casino"
                        icon=""
                    />
                </>
            );
        }
    };

    const refreshBalance = () => {
        setUserBalance("");
        callApi(contextData, "GET", "/get-user-balance", callbackRefreshBalance, null);
    };

    const callbackRefreshBalance = (result) => {
        setUserBalance(result && result.balance);
    };

    const getStatus = () => {
        callApi(contextData, "GET", "/get-status", callbackGetStatus, null);
    };

    const getPage = (page) => {
        setSelectedPage(page);
        callApi(contextData, "GET", "/get-page?page=" + page, callbackGetPage, null);
        navigate("/" + (page === "home" ? "" : page));
    };

    const callbackGetPage = () => {
    };

    const callbackGetStatus = (result) => {
        if ((result && result.slots_only == null) || (result && result.slots_only == false)) {
            setIsSlotsOnly("false");
        } else {
            setIsSlotsOnly("true");
        }
    };

    const handleLoginSuccess = (balance) => {
        setUserBalance(balance);
    };

    const handleLogoutClick = () => {
        callApi(contextData, "POST", "/logout", (result) => {
            if (result.status === "success") {
                setTimeout(() => {
                    localStorage.removeItem("session");
                    window.location.href = "/";
                }, 200);
            }
        }, null);
    };

    const handleChangePasswordClick = () => {
        setShowChangePasswordModal(true);
    };

    const handleChangePasswordConfirm = () => {
        setShowLogoutModal(false);
    };

    const layoutContextValue = {
        isLogin,
        userBalance,
        handleLogoutClick,
        handleChangePasswordClick,
        refreshBalance
    };

    return (
        <LayoutContext.Provider value={layoutContextValue}>
            <NavigationContext.Provider
                value={{ fragmentNavLinksTop, selectedPage, setSelectedPage, getPage }}
            >
                <>
                    {showLoginModal && (
                        <LoginModal
                            isOpen={showLoginModal}
                            onClose={() => setShowLoginModal(false)}
                            onLoginSuccess={handleLoginSuccess}
                        />
                    )}
                    {showLogoutModal && (
                        <LogoutConfirmModal 
                            onConfirm={handleLogoutConfirm}
                            onClose={() => setShowLogoutModal(false)}
                        />
                    )}
                    {showChangePasswordModal && (
                        <ChangePasswordModal 
                            onConfirm={handleChangePasswordConfirm} 
                            onClose={() => setShowChangePasswordModal(false)}
                        />
                    )}
                    <>
                        {
                            !isSport && <Header
                                isLogin={isLogin}
                                userBalance={userBalance}
                                handleLogoutClick={handleLogoutClick}
                                handleChangePasswordClick={handleChangePasswordClick}
                                fragmentNavLinksTop={fragmentNavLinksTop}
                                isSlotsOnly={isSlotsOnly}
                            />
                        }
                        <main className={isCasino ? 'casino main' : isLiveCasino ? 'live-casino-container' : isHalloween ? 'live-casino-container halloween' : isCrash ? 'crash' : isAuth ? 'auth' : 'main'} id="wlcp">
                            <Outlet />
                        </main>
                        { !isSport && <Footer /> }
                    </>
                </>
            </NavigationContext.Provider>
        </LayoutContext.Provider>
    );
};

export default Layout;