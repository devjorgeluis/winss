import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { callApi } from "../../utils/Utils";
import ImgProfile from "/src/assets/img/profile-3d.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToastContent = ({ title, message }) => (
    <div>
        <strong>{title}</strong>
        <p className="m-0">{message}</p>
    </div>
);


const ProfileChangePassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { contextData } = useContext(AppContext);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!contextData?.session) {
            navigate("/");
        }
    }, [contextData?.session, navigate]);

    const currentUser = contextData?.session?.user;    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const formatBalance = (value) => {
        if (value === null || value === undefined || value === "") return "0,00";
        const num = Number(value);
        if (Number.isNaN(num)) return "0,00";
        return num.toLocaleString("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Todos los campos son obligatorios." />);
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Las contraseñas nuevas no coinciden." />);
            return;
        }


        setLoading(true);

        try {
            let body = {
                old_password: oldPassword,
                new_password: newPassword,
            };

            const result = await callApi(
                contextData,
                "POST",
                "/change-password",
                handleResponse,
                JSON.stringify(body)
            );
        } catch (err) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Error de conexión. Intente nuevamente." />);
        }
    };

    const handleResponse = (result) => {
        setLoading(false);
                
        if (result.status === "0") {
            toast.success(<CustomToastContent title="¡Albricias!" message="Password cambiado correctamente." />);
        } else if (result.status === 401) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Iniciar sesión primero." />);
        } else if (result.status === 500 || result.status === 422) {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message={result.message} />);
        } else {
            toast.error(<CustomToastContent title="¡Vaya! ¡Algo salió mal!" message="Error desconocido. Intenta nuevamente." />);
        }
    };

    const togglePasswordVisibility = (field) => {
        switch (field) {
            case "old":
                setShowOldPassword(!showOldPassword);
                break;
            case "new":
                setShowNewPassword(!showNewPassword);
                break;
            case "confirm":
                setShowConfirmPassword(!showConfirmPassword);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="container">
                <div className="row profile mt-3 pt-3">
                    <div className="col-md-3 col-md-pull-9 blockin">
                        <div className="profile-sidebar">
                            <div className="con-pic">
                                <div className="profile-userpic">
                                    <img
                                        src={currentUser?.profile_image || ImgProfile}
                                        className="img-responsive"
                                        alt="Foto de perfil"
                                    />
                                </div>
                            </div>
                            <div className="profile-usertitle">
                                <div className="col-xs-12 header-name">
                                    {currentUser?.username}
                                </div>
                                <div className="col-xs-12 header-info-user">
                                    <i className="far fa-user"></i>{" "}
                                    <strong>
                                        {currentUser?.first_name ||
                                            currentUser?.username}
                                    </strong>
                                    <br />
                                    <i className="far fa-envelope"></i>{" "}
                                    {currentUser?.email || "No disponible"}
                                </div>
                            </div>
                            <div className="list-group bg-dark profile-list">
                                <a
                                    href="/profile/history"
                                    className="list-group-item list-group-item-action text-white item-list-o"
                                >
                                    <i className="far fa-clock"></i> Historial
                                </a>
                                <a
                                    href="/profile/edit"
                                    className="list-group-item list-group-item-action text-white item-list-o"
                                >
                                    <i className="far fa-user"></i> Mi Perfil
                                </a>
                                <a
                                    href="/profile/change-password"
                                    className="list-group-item list-group-item-action text-white item-list-o"
                                >
                                    <i className="fas fa-key"></i> Cambiar Contraseña
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 col-md-push-3 blockin">
                        <div className="profile-content">
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 header-profile">
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-0 text-right">
                                            <a className="btn btn-md btn-success cashin cashin-open">
                                                <i className="fas fa-money-bill-wave"></i>
                                                <br />
                                                Depositar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-0 balance">
                                    <div className="row">
                                        <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 px-0 mx-auto">
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 px-0 d-block mx-auto text-center">
                                                    <div className="text-white">
                                                        <p
                                                            className="mb-1"
                                                            style={{
                                                                letterSpacing: "2px",
                                                                fontSize: "20px",
                                                                textTransform: "uppercase",
                                                                fontWeight: "700",
                                                            }}
                                                        >
                                                            Balance Total
                                                        </p>
                                                    </div>
                                                    <div className="bg-danger btn-block btn-md balance-total">
                                                        $
                                                        <span className="walletBalance">
                                                            {" "}
                                                            {formatBalance(
                                                                contextData.session?.user?.balance
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-content-historial">
                            <div id="profileEdit" className="profile-form-container">
                                <div className="col-xs-12 col-sm-9 col-md-9 col-lg-9 col-xl-9">
                                    <div className="col-xs-12 header-name"><i className="far fa-user"></i> Cambiar Contraseña</div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="d-xs-none col-md-1"></div>
                                    <div className="col-12 col-md-10">
                                        <form onSubmit={handleChangePassword}>
                                            <div className="form-row">
                                                <div className="form-group input-group col-md-12 email-pf">
                                                    <label>
                                                        <h6><strong>Correo Electrónico</strong></h6>
                                                    </label>
                                                    <div className="input-group align-items-center">
                                                        <i className="far fa-envelope mr-1"></i>{" "}
                                                        {currentUser?.email || "No disponible"}
                                                    </div>
                                                </div>
                                                <div className="form-group input-group col-md-12 user-pf">
                                                    <label className="mr-1">
                                                        <i className="far fa-user mr-1"></i> <strong>Usuario : </strong>
                                                    </label>
                                                    {currentUser?.username}
                                                </div>
                                                <div className="form-group input-group">
                                                    <label><strong>Contraseña Actual</strong></label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend"><i className="fas fa-key"></i></div>
                                                            <input
                                                                className="el-input__inner"
                                                                type={showOldPassword ? "text" : "password"}
                                                                name="old-password"
                                                                placeholder="Contraseña Actual"
                                                                value={oldPassword}
                                                                onChange={(e) => setOldPassword(e.target.value)}
                                                            />
                                                            <div className="el-input-group__append">
                                                                <button
                                                                    type="button"
                                                                    className="el-button el-button--default"
                                                                    onClick={() => togglePasswordVisibility("old")}
                                                                    style={{ padding: "8px 12px" }}
                                                                >
                                                                    <i className={`fas ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group input-group">
                                                    <label><strong>Nueva Contraseña</strong></label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend"><i className="fas fa-unlock"></i></div>
                                                            <input
                                                                className="el-input__inner"
                                                                type={showNewPassword ? "text" : "password"}
                                                                name="new-password"
                                                                placeholder="Nueva Contraseña"
                                                                value={newPassword}
                                                                onChange={(e) => setNewPassword(e.target.value)}
                                                            />
                                                            <div className="el-input-group__append">
                                                                <button
                                                                    type="button"
                                                                    className="el-button el-button--default"
                                                                    onClick={() => togglePasswordVisibility("new")}
                                                                    style={{ padding: "8px 12px" }}
                                                                >
                                                                    <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group input-group">
                                                    <label><strong>Confirmar Contraseña</strong></label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend"><i className="fas fa-lock"></i></div>
                                                            <input
                                                                className="el-input__inner"
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                name="repeat-new-password"
                                                                placeholder="Confirmar Contraseña"
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                            />
                                                            <div className="el-input-group__append">
                                                                <button
                                                                    type="button"
                                                                    className="el-button el-button--default"
                                                                    onClick={() => togglePasswordVisibility("confirm")}
                                                                    style={{ padding: "8px 12px" }}
                                                                >
                                                                    <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <button 
                                                    type="submit" 
                                                    className="el-button el-button--info is-plain mx-auto"
                                                    disabled={loading}
                                                >
                                                    <span>
                                                        {loading ? (
                                                            <>
                                                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                                                Procesando...
                                                            </>
                                                        ) : (
                                                            "Actualizar"
                                                        )}
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="d-xs-none col-md-1"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileChangePassword;
