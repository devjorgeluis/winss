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
                <nav className="navbar navbar-expand navbar-custom-mini">
                    <div className="container container-header">
                        <div className="navbar-collapse collapse">
                            <ul className="navbar-nav btn-sm">
                                <li className="nav-item active">
                                    <a className="nav-link nav-link-mini clock-div" href="#">
                                        <i className="far fa-clock"></i>
                                        <div id="MyClockDisplay" className="clock">12:12:17 AM</div>
                                    </a>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown btn-sm">
                                    <a className="nav-link nav-link-mini dropdown-toggle" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src={ImgFlagES} />
                                        <span className="lang-large-name">ESPAÑOL</span>
                                        <span className="lang-shot-name">ES</span>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown" id="dropdown-tls">
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
                </nav>
                <div className="container-fluid hw-bg">
                    <div className="container container-header-flex p-0">
                        <div id="header-bg">
                            <div className="modal fade" id="LoginModalExpress" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                            <div className="row p-5">
                                                <div className="container-fluid">
                                                    <article className="card-body mx-auto content-relog">
                                                        <h4>INICIAR SESIÓN</h4>
                                                        <form method="post" action="https://winss.bet/auth/login" className="form frmAuthLogin" role="form" autoComplete="off" noValidate="">
                                                            <div className="form-group input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text input-group-text-icon"> <i className="fa fa-user"></i> </span>
                                                                </div>
                                                                <input name="username" className="form-control form-control-auth btn-md" placeholder="Usuario" type="text" />
                                                            </div>
                                                            <div className="form-group input-group">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text input-group-text-icon"> <i className="fa fa-lock"></i> </span>
                                                                </div>
                                                                <input name="password" className="form-control form-control-auth btn-md" placeholder="Contraseña" type="password" />
                                                            </div>

                                                            <button
                                                                type="submit"
                                                                data-submit=".frmAuthLogin"
                                                                className="btn btn-lo btn-green-ct btn-danger btn-md btn-block btn-submit reg-submit"
                                                                data-loading-text="&lt;i class='fa fa-circle-o-notch fa-spin'&gt;&lt;/i&gt; Procesando Orden"
                                                            >
                                                                Entrar
                                                            </button>
                                                        </form>
                                                        <br />

                                                        <form method="post" action="https://winss.bet/auth/password/reset" className="form frmPasswordRestore" role="form" autoComplete="off">
                                                            <div className="accordion" id="accordionExample">
                                                                <div className="card">
                                                                    <div className="card-header-" id="headingThree">
                                                                        <h5 className="mb-0">
                                                                            <button
                                                                                className="btn btn-block btn-sm recuperar"
                                                                                type="button"
                                                                                data-toggle="collapse"
                                                                                data-target=".collapseThree"
                                                                                aria-expanded="true"
                                                                                aria-controls="collapseThree"
                                                                            >
                                                                                RECUPERAR CONTRASEÑA
                                                                            </button>
                                                                            <a href="/contacto" className="btn btn-block btn-sm click-contact" type="button">
                                                                                RECUPERAR CONTRASEÑA
                                                                            </a>
                                                                        </h5>
                                                                    </div>
                                                                    <div id="collapseThree" className="collapse collapseThree" aria-labelledby="headingThree" data-parent="#accordionExample">
                                                                        <div className="form-group input-group">
                                                                            <div className="input-group-prepend">
                                                                                <span className="input-group-text input-group-text-icon"> <i className="fas fa-envelope"></i> </span>
                                                                            </div>
                                                                            <input name="email" className="form-control btn-md" placeholder="Ingrese su correo" type="email" required="" />
                                                                        </div>

                                                                        <button
                                                                            type="submit"
                                                                            data-submit=".frmPasswordRestore"
                                                                            className="btn btn-lo btn-green-ct btn-danger btn-md btn-block btn-submit reg-submit"
                                                                            data-loading-text="&lt;i class='fa fa-circle-o-notch fa-spin'&gt;&lt;/i&gt; Procesando Orden"
                                                                        >
                                                                            RECUPERAR CONTRASEÑA
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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