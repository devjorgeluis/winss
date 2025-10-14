import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import ImgFlagES from "/src/assets/img/es_ES.png";
import ImgFlagFR from "/src/assets/img/fr_TN.png";
import ImgFlagEN from "/src/assets/img/en_US.png";
import ImgFlagPT from "/src/assets/img/pt_BR.png";
import ImgFlagHE from "/src/assets/img/he_IL.png";

import ImgLogo from "/src/assets/img/winss.png";

const Header = ({ isLogin, userBalance, handleLogoutClick, handleChangePasswordClick, fragmentNavLinksTop, isSlotsOnly }) => {
    const { contextData } = useContext(AppContext);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    
    const toggleLanguageDropdown = () => {
        setShowLanguageDropdown(!showLanguageDropdown);
    };
    
    const closeLanguageDropdown = () => {
        setShowLanguageDropdown(false);
    };

    return (
        <>
            <div id="wl-top">
                <div className="container-fluid hw-bg">
                    <div className="container container-header-flex p-0">
                        <div id="header-bg">
                            <div className="row">
                                <div className="col-4 col-sm-6 col-md-3 col-lg-2 col-xl-4 logo-responsive">
                                    <a className="navbar-brand" href="/">
                                        <img id="logo" className="logo-header" src={ImgLogo} alt="Logo de winss.bet" />
                                    </a>
                                </div>
                                <div className="col-8 col-sm-6 col-md-7 col-lg-10 col-xl-8 login-header">
                                    <div className="container-top">
                                        <ul className="nav">
                                            {fragmentNavLinksTop}
                                        </ul>
                                    </div>

                                    {
                                        isLogin ?
                                        <div className="btn-group d-wallet-default d-wallet-default-header" role="group">
                                            <button className="btn dropdown-toggle btn-sm btn-success btn-menu-top-login" type="button" data-toggle="dropdown" id="navbarDropdown2" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-user"></i> <span>Hola, </span> <strong>{contextData?.session?.user?.username || 'Guest'}</strong><br />
                                                <i className="fas fa-money-bill-wave"></i> <span>$</span> <span className="walletBalance">{userBalance ? parseFloat(userBalance).toFixed(2) : ""}</span>
                                            </button>
                                            
                                            <div
                                                className="dropdown-menu"
                                                style={{
                                                    zIndex: 10000,
                                                    cursor: "pointer"
                                                }}
                                            >
                                                <a className="dropdown-item btn-sm" href="/profile/history"><i className="fas fa-wallet"></i> Ir a billetera</a>
                                                <a className="dropdown-item btn-sm" onClick={() => handleLogoutClick()}><i className="fas fa-sign-out-alt"></i> Cerrar sesión</a>
                                            </div>
                                            <div className="nav-item dropdown" style={{ position: 'relative' }}>
                                                <a 
                                                    className="nav-link nav-link-mini dropdown-toggle p-0" 
                                                    id="navbarDropdown3" 
                                                    onClick={toggleLanguageDropdown}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <img src={ImgFlagES} />
                                                </a>
                                                {showLanguageDropdown && (
                                                    <div 
                                                        className="dropdown-menu show" 
                                                        style={{ 
                                                            position: 'absolute', 
                                                            right: 0, 
                                                            top: '100%',
                                                            zIndex: 10000
                                                        }}
                                                    >
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                            <img src={ImgFlagES} width="27px" height="20px" /> Español
                                                        </a>
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                            <img src={ImgFlagFR} width="27px" height="20px" /> Frances</a>
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                            <img src={ImgFlagEN} width="27px" height="20px" /> Inglés
                                                        </a>
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                            <img src={ImgFlagPT} width="27px" height="20px" /> Portugués
                                                        </a>
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                            <img src={ImgFlagHE} width="27px" height="20px" /> Hebreo
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        :
                                        <div className="btn-group login-group" role="group">
                                            <div className="login-group-default">
                                                <a href="/register" className="btn btn-dark btn-menu-top btndrop btn-register-a"> <i className="fas fa-user"></i> CREAR CUENTA </a>
                                                <a href="/login" className="btn btn-danger btn-menu-top btndrop btn-login-a"> <i className="fas fa-lock"></i> INICIAR SESIÓN </a>

                                                <div className="nav-item dropdown" style={{ position: 'relative' }}>
                                                    <a 
                                                        className="nav-link nav-link-mini dropdown-toggle p-0" 
                                                        id="navbarDropdown" 
                                                        onClick={toggleLanguageDropdown}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <img src={ImgFlagES} />
                                                    </a>
                                                    {showLanguageDropdown && (
                                                        <div 
                                                            className="dropdown-menu show" 
                                                            style={{ 
                                                                position: 'absolute', 
                                                                right: 0, 
                                                                top: '100%',
                                                                zIndex: 10000
                                                            }}
                                                        >
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                                <img src={ImgFlagES} width="27px" height="20px" /> Español
                                                            </a>
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                                <img src={ImgFlagFR} width="27px" height="20px" /> Frances</a>
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                                <img src={ImgFlagEN} width="27px" height="20px" /> Inglés
                                                            </a>
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                                <img src={ImgFlagPT} width="27px" height="20px" /> Portugués
                                                            </a>
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#" onClick={closeLanguageDropdown}>
                                                                <img src={ImgFlagHE} width="27px" height="20px" /> Hebreo
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div id="header-bg">
                            <ul className="nav mobile-header">
                                {fragmentNavLinksTop}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
