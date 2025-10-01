import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import ImgFlagES from "/src/assets/img/es_ES.png";
import ImgFlagFR from "/src/assets/img/fr_TN.png";
import ImgFlagEN from "/src/assets/img/en_US.png";
import ImgFlagPT from "/src/assets/img/pt_BR.png";
import ImgFlagHE from "/src/assets/img/he_IL.png";

import ImgLogo from "/src/assets/img/logo.png";
import IconProfile from "/src/assets/svg/profile.svg";
import IconHamburger from "/src/assets/svg/hamburger.svg";

const Header = ({ isLogin, userBalance, handleLoginClick, handleLogoutClick, handleChangePasswordClick, fragmentNavLinksTop, isSlotsOnly }) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const openMenu = () => {
        setShowUserMenu(!showUserMenu);
    };
    const onClose = () => {
        setShowUserMenu(false);
    }

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
                                            <a className="btn btn-sm btn-success cashin-open btn-mini" data-toggle="modal" data-target="#transactions-modal">
                                                <i className="fas fa-money-bill-wave"></i><br />
                                                Depositar
                                            </a>
                                            <a className="btn btn-danger btn-sm cashout-open btn-mini" data-toggle="modal" data-target="#transactions-modal">
                                                <i className="fas fa-arrow-alt-circle-down"></i> <br />
                                                Retirar
                                            </a>
                                            <button className="btn dropdown-toggle btn-sm btn-success btn-menu-top-login" type="button" data-toggle="dropdown" id="navbarDropdown2" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-user"></i> <span>Hola, </span> <strong>betarsis</strong><br />
                                                <i className="fas fa-money-bill-wave"></i> <span>AR$</span> <span className="walletBalance">0,00</span>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdown">
                                                <a className="dropdown-item btn-sm" href="https://winss.bet/profile/wallet"><i className="fas fa-wallet"></i> Ir a billetera</a>

                                                <a className="dropdown-item btn-sm" href="https://winss.bet/auth/logout"><i className="fas fa-sign-out-alt"></i> Cerrar sesión</a>

                                                <a className="nav-link nav-link-mini dropdown-toggle p-0" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <img src={ImgFlagES} />
                                                </a>
                                            </div>
                                            <ul className="navbar-nav ml-auto idomas_reponsive__">
                                                <li className="nav-item btn-sm" style="padding: 0;">

                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                            <img src={ImgFlagES} width="27px" height="20px" /> Español
                                                        </a>
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                            <img src={ImgFlagFR} width="27px" height="20px" /> Frances</a>
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                            <img src={ImgFlagEN} width="27px" height="20px" /> Inglés
                                                        </a>
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                            <img src={ImgFlagPT} width="27px" height="20px" /> Portugués
                                                        </a>
                                                        <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                            <img src={ImgFlagHE} width="27px" height="20px" /> Hebreo
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        :
                                        <div className="btn-group login-group" role="group">
                                            <div className="login-group-default">
                                                <a href="/register" className="btn btn-dark btn-menu-top btndrop btn-register-a"> <i className="fas fa-user"></i> CREAR CUENTA </a>
                                                <a href="/login" className="btn btn-danger btn-menu-top btndrop btn-login-a"> <i className="fas fa-lock"></i> INICIAR SESIÓN </a>

                                                <a className="nav-link nav-link-mini dropdown-toggle p-0" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <img src={ImgFlagES} />
                                                </a>
                                                <ul className="navbar-nav ml-auto idomas_reponsive__">
                                                    <li className="nav-item btn-sm px-0">
                                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                                <img src={ImgFlagES} width="27px" height="20px" /> Español
                                                            </a>
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                                <img src={ImgFlagFR} width="27px" height="20px" /> Frances</a>
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                                <img src={ImgFlagEN} width="27px" height="20px" /> Inglés
                                                            </a>
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                                <img src={ImgFlagPT} width="27px" height="20px" /> Portugués
                                                            </a>
                                                            <a className="dropdown-item" id="dropdown-item-tls" href="#">
                                                                <img src={ImgFlagHE} width="27px" height="20px" /> Hebreo
                                                            </a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showUserMenu && <UserMenu
                handleChangePasswordClick={() => { handleChangePasswordClick(); onClose(); }}
                handleLogoutClick={() => { handleLogoutClick(); onClose(); }}
                onClose={onClose}
            />}
        </>
    );
};

export default Header;