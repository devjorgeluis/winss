import ImgGCB from "/src/assets/img/gcb-logo.png";
import ImgCertified from "/src/assets/img/gaming-certified.jpg";
import Img18 from "/src/assets/img/plus-18-movie.png";

const Footer = () => {
    return (
        <footer className="footer-bc">
            <div className="container p-0">
                <div className="row align-items-center">
                    <div className="col-9 align-items-center">
                        <a
                            href="https://cert.gcb.cw/certificate?id=ZXlKcGRpSTZJalppU0Uxb2RrUm9XWFZCWTNKSFdreHhOR0pVTlhjOVBTSXNJblpoYkhWbElqb2lPV3RoZWt0RWIzbExOa2hJTkZWSVpDdFNkRTV3UVQwOUlpd2liV0ZqSWpvaU1tVTFZVGN3TVRjMVpEa3hPVGRoTkRaaE5XTTFaVE00TWpZNE5ESXpZVGswWldWak5HTXhZVFExT0dFNE5USmpPRE13WkRZNU9EWXpNREF3TkRjMU1TSXNJblJoWnlJNklpSjk="
                            target="_blank"
                        >
                            <img className="mr-5" src={ImgGCB} height={35} alt="GCB" />
                        </a>
                        <a href="https://evenbetgaming.com/RN-120-ESF-19-01%20-%20Evenbet%20RNG,%20version%206.8.1.pdf" target="_blank">
                            <img className="mr-5" src={ImgCertified} height={35} alt="Gaming Labs Certified" />
                        </a>
                        <img className="mr-5" src={Img18} height={35} alt="18+" />
                    </div>

                    <div className="col-3 d-flex justify-content-end">
                        <a href="#" target="_blank">
                            <button type="button">
                                <i className="fab fa-telegram"></i>
                            </button>
                        </a>
                        <a href="#" target="_blank">
                            <button type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="25" height="25" fill="white">
                                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"></path>
                                </svg>
                            </button>
                        </a>
                        <a href="https://www.instagram.com/winssbet/" target="_blank">
                            <button type="button">
                                <i className="fab fa-instagram"></i>
                            </button>
                        </a>
                        <a href="#" target="_blank">
                            <button type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" fill="white" className="icon-x">
                                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                                </svg>
                            </button>
                        </a>
                        <a href="#" target="_blank">
                            <button type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="25" height="25" fill="white">
                                    <path
                                        d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"
                                    ></path>
                                </svg>
                            </button>
                        </a>
                        <a href="#" target="_blank">
                            <button type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="25" height="25" fill="white">
                                    <path
                                        d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"
                                    ></path>
                                </svg>
                            </button>
                        </a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6 col-sm-6 col-md-3 col-lg-3">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center">
                            <a href="https://winss.bet" className="logofooter">
                                <img src="https://images.kbapi.net/images/Whitelabel/Winss/LogoFooter.png" className="pure-img" />
                            </a>
                        </div>
                        <div className="col-sm-12 col-md-12 text-center">© Winss.bet - 2025.</div>
                        <div className="col-sm-12 col-md-12 text-center">Todos los derechos reservados</div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center order-3 order-sm-6 order-sm-12">
                        <ul className="list-footer mb-0">
                            <li><a href="https://winss.bet/assets/pdf/winss/aml-policy_es_ES.pdf" target="_blank">Política AML</a></li>
                            <li><a href="https://winss.bet/assets/pdf/winss/self-exclusion_es_ES.pdf" target="_blank">AutoExclusión</a></li>
                            <li><a href="https://winss.bet/assets/pdf/winss/amlkyc-policy_es_ES.pdf" target="_blank">Política de KYC</a></li>
                            <li><a href="https://winss.bet/assets/pdf/winss/juegos-responsable_es_ES.pdf" target="_blank">Juego Responsable</a></li>
                            <li><a href="https://winss.bet/assets/pdf/winss/terms-services_es_ES.pdf" target="_blank">Términos de Servicio</a></li>
                        </ul>
                        <ul className="list-footer mt-0">
                            <li><a href="https://winss.bet/assets/pdf/winss/dispute-resolution_es_ES.pdf" target="_blank">Resolución de Disputas</a></li>
                            <li><a href="https://winss.bet/assets/pdf/winss/accounts-payouts_es_ES.pdf" target="_blank">Cuentas, Pagos y Bonos</a></li>
                            <li><a href="https://winss.bet/assets/pdf/winss/fairness-rng_es_ES.pdf" target="_blank">Métodos de prueba de Justicia y RNG</a></li>
                            <li><a href="https://winss.bet/assets/pdf/winss/privacy-policy_es_ES.pdf" target="_blank">Privacidad y gestión de datos personales</a></li>
                        </ul>

                        <p className="default-copy">Lea nuestro Reglamento para aclarar todas sus dudas sobre nuestro funcionamiento.</p>
                    </div>
                    <div className="col-6 col-sm-6 col-md-3 col-lg-3 pb-2 order-2 order-sm-6 order-md-12 pr-4">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-8 pt-3 p-2">
                                <p className="curacao-text">
                                    winss.bet está operado por Games &amp; More B.V, una empresa constituida con arreglo a las leyes de Curaçao con el número de sociedad 149948 (0) y que cuenta con licencia de la Junta de Control del Juego de
                                    Curaçao para ofrecer juegos de azar con el número de licencia OGL/2023/121/0086
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;