import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import { callApi } from "../utils/Utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToastContent = ({ title, message }) => (
    <div>
        <strong>{title}</strong>
        <p className="m-0">{message}</p>
    </div>
);

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { contextData, updateSession } = useContext(AppContext);
    
    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: ""
    });
    const [resetFormData, setResetFormData] = useState({
        email: ""
    });
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isResetLoading, setIsResetLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleResetInputChange = (e) => {
        const { name, value } = e.target;
        setResetFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);

        if (!loginFormData.username) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="El nombre de usuario es requerido." />);
            setIsLoginLoading(false);
            return;
        }

        if (!loginFormData.password) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="El contraseña es requerido." />);
            setIsLoginLoading(false);
            return;
        }

        try {
            let body = {
                username: loginFormData.username,
                password: loginFormData.password,
            };

            const result = await callApi(
                contextData,
                "POST",
                "/login",
                handleLoginResponse,
                JSON.stringify(body)
            );
        } catch (error) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Error de conexión. Intenta nuevamente." />);
            setIsLoginLoading(false);
        }
    };

    const handleLoginResponse = (result) => {
        setIsLoginLoading(false);
        
        if (result.status === 200 || result.status === "success") {
            localStorage.setItem("session", JSON.stringify(result));
            updateSession(result);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else if (result.status === 401) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Verifica tu usuario y contraseña." />);
        } else if (result.status === 500 || result.status === 422) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message={result.message} />);
        } else {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Error desconocido. Intenta nuevamente." />);
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setIsResetLoading(true);

        if (!resetFormData.email) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Por favor ingresa tu correo electrónico." />);
            setIsResetLoading(false);
            return;
        }

        try {
            const result = await callApi(
                contextData,
                "POST",
                "/password/reset",
                handleResetResponse,
                resetFormData
            );
        } catch (error) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="No se puede recuperar la contraseña, inténtelo nuevamente." />);
            setIsResetLoading(false);
        }
    };

    const handleResetResponse = (result) => {
        setIsResetLoading(false);
        
        if (result.status === 200 || result.status === "success") {
            const collapseElement = document.querySelector('.collapseThree');
            if (collapseElement) {
                collapseElement.classList.remove('show');
            }
            setResetFormData({ email: "" });
        } else if (result.status === 404) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="No se encontró una cuenta con ese correo electrónico." />);
        } else if (result.status === 500 || result.status === 422) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message={result.message} />);
        } else {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Error desconocido. Intenta nuevamente." />);
        }
    };

    return (
        <div className="main container-fluid main-static kb-whitelabel-auth-login">
            <article className="card-body mx-auto content-relog" style={{ maxWidth: "300px" }}>
                <h4 style={{ textAlign: "center", color: "#fff", textTransform: "uppercase", letterSpacing: "3px" }}>
                    INICIAR SESIÓN
                </h4>

                <form className="form frmAuthLogin" onSubmit={handleLoginSubmit}>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text input-group-text-icon"> 
                                <i className="fa fa-user"></i> 
                            </span>
                        </div>
                        <input 
                            name="username" 
                            className="form-control form-control-auth btn-md" 
                            placeholder="Usuario" 
                            type="text" 
                            value={loginFormData.username}
                            onChange={handleLoginInputChange}
                        />
                    </div>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text input-group-text-icon"> 
                                <i className="fa fa-lock"></i> 
                            </span>
                        </div>
                        <input 
                            name="password" 
                            className="form-control form-control-auth btn-md" 
                            placeholder="Contraseña" 
                            type="password" 
                            value={loginFormData.password}
                            onChange={handleLoginInputChange}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-lo btn-green-ct btn-danger btn-md btn-block btn-submit reg-submit"
                        disabled={isLoginLoading}
                    >
                        {isLoginLoading ? "Procesando..." : "Entrar"}
                    </button>
                </form>
                <br />

                <form className="form frmPasswordRestore" onSubmit={handleResetSubmit}>
                    <div className="accordion" id="accordionExample">
                        <div className="card" style={{ backgroundColor: "transparent" }}>
                            <div className="card-header-" id="headingThree">
                                <h5 className="mb-0">
                                    <button
                                        className="btn btn-block btn-sm recuperar"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target=".collapseThree"
                                        aria-expanded="true"
                                        aria-controls="collapseThree"
                                        style={{ backgroundColor: "rgb(0 0 0 / 47%)" }}
                                    >
                                        RECUPERAR CONTRASEÑA
                                    </button>
                                    <a href="/contacto" className="btn btn-block btn-sm click-contact" type="button" style={{ display: "none" }}>
                                        RECUPERAR CONTRASEÑA
                                    </a>
                                </h5>
                            </div>
                            <div id="collapseThree" className="collapse collapseThree" aria-labelledby="headingThree" data-parent="#accordionExample">
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text input-group-text-icon"> 
                                            <i className="fas fa-envelope"></i> 
                                        </span>
                                    </div>
                                    <input 
                                        name="email" 
                                        className="form-control btn-md" 
                                        placeholder="Ingrese su correo" 
                                        type="email" 
                                        required 
                                        value={resetFormData.email}
                                        onChange={handleResetInputChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-lo btn-green-ct btn-danger btn-md btn-block btn-submit reg-submit"
                                    disabled={isResetLoading}
                                >
                                    {isResetLoading ? "Procesando..." : "RECUPERAR CONTRASEÑA"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </article>
        </div>
    );
};

export default Login;
