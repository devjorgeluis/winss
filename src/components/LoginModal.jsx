import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { callApi } from "../utils/Utils";
import CustomAlert from "../components/CustomAlert";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const { contextData, updateSession } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [messageCustomAlert, setMessageCustomAlert] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            let body = {
                username: username,
                password: password,
            };
            callApi(
                contextData,
                "POST",
                "/login/",
                callbackSubmitLogin,
                JSON.stringify(body)
            );
        }
    };

    const callbackSubmitLogin = (result) => {
        if (result.status === "success") {
            setMessageCustomAlert(["success", "¡Éxito! La sesión ha sido iniciada"]);
            localStorage.setItem("session", JSON.stringify(result));
            updateSession(result);

            if (onLoginSuccess) {
                onLoginSuccess(result.user.balance);
            }
            setTimeout(() => {
                onClose();
            }, 1000);
        } else {
            setMessageCustomAlert(["error", "¡Error! Nombre de usuario o contraseña no válidos"]);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="modal d-block" id="showGame">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="main container-fluid main-standalone">
                            <div id="main-loading">
                                <div className="spinner"></div>
                                <p>Cargando...</p>
                            </div>

                            <div id="main-content">
                                <article className="card-body mx-auto content-relog">
                                    <h4>INICIAR SESION</h4>
                                    <form method="POST" onSubmit={handleSubmit}>
                                        <div className="form-group input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text input-group-text-icon"> <i className="fa fa-user"></i> </span>
                                            </div>
                                            <input
                                                className="form-control btn-md"
                                                type="text"
                                                name="username"
                                                placeholder="Usuario"
                                                autoComplete="false"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text input-group-text-icon"> <i className="fa fa-lock"></i> </span>
                                            </div>
                                            <input
                                                id="password"
                                                className="form-control btn-md"
                                                type="password"
                                                name="password"
                                                placeholder="Contraseña"
                                                autoComplete="false"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            data-submit=".frmAuthLogin"
                                            className="btn btn-lo btn-green-ct btn-danger btn-md btn-block btn-submit reg-submit"
                                        >
                                            Entrar
                                        </button>
                                    </form>
                                    <br />

                                    <form method="POST" onSubmit={handleSubmit}>
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
                                                    </h5>
                                                </div>
                                                <div id="collapseThree" className="collapse collapseThree" aria-labelledby="headingThree" data-parent="#accordionExample">
                                                    <div className="form-group input-group">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text input-group-text-icon"> <i className="fas fa-envelope"></i> </span>
                                                        </div>
                                                        <input
                                                            className="form-control btn-md"
                                                            type="email"
                                                            name="email"
                                                            placeholder="Ingrese su correo"
                                                            autoComplete="false"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        className="btn btn-lo btn-green-ct btn-danger btn-md btn-block btn-submit reg-submit"
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

                        <div className="action-buttons">
                            <button type="button" className="btn-dark btn-box-option btn-sm text-white">
                                <i className="fas fa-expand"></i>
                            </button>
                            <button type="button" data-dismiss="modal" className="btn-dark btn-box-option btn-sm text-white" onClick={onClose}>
                                <i className="far fa-times-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <CustomAlert message={messageCustomAlert} />
        </>
    );
};

export default LoginModal;