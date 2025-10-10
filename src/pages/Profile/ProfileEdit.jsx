import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";
import ImgProfile from "/src/assets/img/profile-3d.jpg";
import IconFlag from "/src/assets/svg/flag.svg";
import countriesData from "/src/assets/json/country.json";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ProfileEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { contextData } = useContext(AppContext);

    const [sexo, setSexo] = useState("");
    const [showSexoDropdown, setShowSexoDropdown] = useState(false);
    const [birthDate, setBirthDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [pais, setPais] = useState("Argentina");
    const [showPaisDropdown, setShowPaisDropdown] = useState(false);

    useEffect(() => {
        if (!contextData?.session) {
            navigate("/");
        }
    }, [contextData?.session, navigate]);

    const currentUser = contextData?.session?.user;
    console.log(currentUser);
    

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

    const handleSexoSelect = (value) => {
        setSexo(value);
        setShowSexoDropdown(false);
    };

    const handleDateChange = (date) => {
        setBirthDate(date);
        setShowCalendar(false);
    };

    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString("es-ES");
    };

    const handlePaisSelect = (value) => {
        setPais(value);
        setShowPaisDropdown(false);
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
                                    href="/profile/change/password"
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
                                                        AR$
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
                                    <div className="col-xs-12 header-name">
                                        <i className="far fa-user"></i> Perfil
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="d-xs-none col-md-2"></div>
                                    <div className="col-12 col-md-8">
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group input-group col-md-6">
                                                    <label>
                                                        <h6>
                                                            <strong>Correo Electrónico</strong>
                                                        </h6>
                                                    </label>
                                                    <div className="input-group align-items-center">
                                                        <i className="far fa-envelope mr-1"></i>{" "}
                                                        {currentUser?.email || "No disponible"}
                                                    </div>
                                                </div>

                                                <div className="form-group input-group col-md-6">
                                                    <label>
                                                        <h6>
                                                            <strong>Usuario</strong>
                                                        </h6>
                                                    </label>
                                                    <div className="input-group align-items-center">
                                                        <i className="far fa-user mr-1"></i>{" "}
                                                        {currentUser?.username || "No disponible"}
                                                    </div>
                                                </div>

                                                <div className="form-group input-group">
                                                    <label>
                                                        <strong>Nombre</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend">
                                                                <i className="far fa-user"></i>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="Nombre"
                                                                className="el-input__inner"
                                                                defaultValue={currentUser?.username || ""}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group">
                                                    <label>
                                                        <strong>Apellido</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend">
                                                                <i className="fas fa-user"></i>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="Apellido"
                                                                className="el-input__inner"
                                                                defaultValue={currentUser?.last_name || ""}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group">
                                                    <label>
                                                        <strong>Fecha de Nacimiento</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div
                                                            className="el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--date"
                                                            style={{ position: "relative" }}
                                                        >
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="Fecha de Nacimiento"
                                                                className="el-input__inner"
                                                                value={formatDate(birthDate)}
                                                                onClick={() => setShowCalendar(!showCalendar)}
                                                                readOnly
                                                            />
                                                            <span className="el-input__prefix">
                                                                <i className="el-input__icon el-icon-date"></i>
                                                            </span>
                                                            <span className="el-input__suffix">
                                                                <span className="el-input__suffix-inner">
                                                                    <i className="el-input__icon"></i>
                                                                </span>
                                                            </span>

                                                            {showCalendar && (
                                                                <div
                                                                    style={{
                                                                        position: "absolute",
                                                                        top: "100%",
                                                                        left: 0,
                                                                        zIndex: 1000,
                                                                        backgroundColor: "white",
                                                                        border: "1px solid #ddd",
                                                                        borderRadius: "4px",
                                                                        boxShadow:
                                                                            "0 2px 8px rgba(0,0,0,0.15)",
                                                                    }}
                                                                >
                                                                    <Calendar
                                                                        onChange={handleDateChange}
                                                                        value={birthDate}
                                                                        locale="es-ES"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group">
                                                    <label>
                                                        <strong>Sexo</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="row">
                                                            <button
                                                                type="button"
                                                                className="el-button el-button--default is-plain"
                                                                style={{
                                                                    backgroundColor: "rgb(52, 58, 64)",
                                                                    padding: "8px 20px",
                                                                    border: "1px solid rgb(26, 29, 35)",
                                                                    display: "inline-flex",
                                                                }}
                                                            >
                                                                <span>
                                                                    <i
                                                                        className="fas fa-venus-mars"
                                                                        style={{ color: "rgb(144, 147, 153)" }}
                                                                    ></i>
                                                                </span>
                                                            </button>
                                                            <div
                                                                className="el-select"
                                                                style={{
                                                                    width: "65%",
                                                                    display: "inline-flex",
                                                                    position: "relative",
                                                                }}
                                                            >
                                                                <div className="el-input el-input--suffix">
                                                                    <input
                                                                        type="text"
                                                                        autoComplete="off"
                                                                        placeholder="Seleccionar"
                                                                        readOnly
                                                                        className="el-input__inner"
                                                                        value={sexo}
                                                                        onClick={() =>
                                                                            setShowSexoDropdown(!showSexoDropdown)
                                                                        }
                                                                    />
                                                                    <span className="el-input__suffix">
                                                                        <span className="el-input__suffix-inner">
                                                                            <i className="fa-solid fa-chevron-down mt-2"></i>
                                                                        </span>
                                                                    </span>
                                                                </div>

                                                                {showSexoDropdown && (
                                                                    <div
                                                                        className="el-select-dropdown el-popper"
                                                                        style={{
                                                                            display: "block",
                                                                            minWidth: "178.934px",
                                                                            position: "absolute",
                                                                            top: "100%",
                                                                            left: 0,
                                                                            zIndex: 1000,
                                                                        }}
                                                                    >
                                                                        <div className="el-scrollbar">
                                                                            <div
                                                                                className="el-scrollbar__wrap"
                                                                            >
                                                                                <ul className="el-scrollbar__view el-select-dropdown__list">
                                                                                    <li
                                                                                        className="el-select-dropdown__item"
                                                                                        onClick={() =>
                                                                                            handleSexoSelect("Masculino")
                                                                                        }
                                                                                        style={{
                                                                                            cursor: "pointer",
                                                                                            padding: "0 16px",
                                                                                        }}
                                                                                    >
                                                                                        <span>Masculino</span>
                                                                                    </li>
                                                                                    <li
                                                                                        className="el-select-dropdown__item"
                                                                                        onClick={() =>
                                                                                            handleSexoSelect("Femenino")
                                                                                        }
                                                                                        style={{
                                                                                            cursor: "pointer",
                                                                                            padding: "0 16px",
                                                                                        }}
                                                                                    >
                                                                                        <span>Femenino</span>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="el-scrollbar__bar is-horizontal">
                                                                                <div
                                                                                    className="el-scrollbar__thumb"
                                                                                    style={{ transform: "translateX(0%)" }}
                                                                                ></div>
                                                                            </div>
                                                                            <div className="el-scrollbar__bar is-vertical">
                                                                                <div
                                                                                    className="el-scrollbar__thumb"
                                                                                    style={{ transform: "translateY(0%)" }}
                                                                                ></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group">
                                                    <label>
                                                        <strong>DNI/Cédula</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend">
                                                                <i className="far fa-id-card"></i>
                                                            </div>
                                                            <input
                                                                type="number"
                                                                autoComplete="off"
                                                                placeholder="DNI/Cédula"
                                                                className="el-input__inner"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <label style={{ width: "100%" }}>
                                                        <strong>
                                                            Fotografías de su documento de identidad
                                                        </strong>
                                                    </label>

                                                    <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6 col-xl-6 px-0">
                                                        <label style={{ marginLeft: "15px" }}>
                                                            <strong>
                                                                Fotografía frontal <br />
                                                                (Por subir)
                                                            </strong>
                                                        </label>
                                                        <div className="avatar-uploader">
                                                            <div
                                                                tabIndex={0}
                                                                className="el-upload el-upload--text"
                                                            >
                                                                <label htmlFor="upload1">
                                                                    <img
                                                                        src={currentUser?.document_front_image || null}
                                                                        className="avatar"
                                                                        alt="Documento frontal"
                                                                    />
                                                                </label>
                                                                <input
                                                                    id="upload1"
                                                                    type="file"
                                                                    name="file"
                                                                    className="el-upload__input"
                                                                />
                                                            </div>
                                                            <ul className="el-upload-list el-upload-list--text"></ul>
                                                        </div>
                                                    </div>

                                                    <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6 col-xl-6 px-0">
                                                        <label style={{ marginLeft: "15px" }}>
                                                            <strong>
                                                                Fotografía trasera <br />
                                                                (Por subir)
                                                            </strong>
                                                        </label>
                                                        <div className="avatar-uploader">
                                                            <div
                                                                tabIndex={0}
                                                                className="el-upload el-upload--text"
                                                            >
                                                                <label htmlFor="upload2">
                                                                    <img
                                                                        src={currentUser?.document_back_image || null}
                                                                        className="avatar"
                                                                        alt="Documento trasera"
                                                                    />
                                                                </label>
                                                                <input
                                                                    id="upload2"
                                                                    type="file"
                                                                    name="file"
                                                                    className="el-upload__input"
                                                                />
                                                            </div>
                                                            <ul className="el-upload-list el-upload-list--text"></ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group">
                                                    <label>
                                                        <strong>Email</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="el-input is-disabled el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend">
                                                                <i className="fas fa-envelope"></i>
                                                            </div>
                                                            <input
                                                                type="email"
                                                                disabled
                                                                autoComplete="off"
                                                                placeholder="Email"
                                                                className="el-input__inner"
                                                                value={currentUser?.email || ""}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group">
                                                    <label>
                                                        <strong>País</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <button
                                                            type="button"
                                                            className="el-button el-button--default is-plain"
                                                            style={{
                                                                backgroundColor: "rgb(52, 58, 64)",
                                                                padding: "8px 20px",
                                                                border: "1px solid rgb(26, 29, 35)",
                                                                display: "inline-flex",
                                                            }}
                                                        >
                                                            <span>
                                                                <i
                                                                    className="fas fa-globe"
                                                                    style={{ color: "rgb(144, 147, 153)" }}
                                                                ></i>
                                                            </span>
                                                        </button>

                                                        <div
                                                            className="el-select"
                                                            style={{
                                                                width: "70%",
                                                                display: "inline-flex",
                                                                position: "relative",
                                                            }}
                                                        >
                                                            <div className="el-input el-input--suffix">
                                                                <input
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    placeholder="Seleccionar"
                                                                    readOnly
                                                                    className="el-input__inner"
                                                                    value={pais}
                                                                    onClick={() =>
                                                                        setShowPaisDropdown(!showPaisDropdown)
                                                                    }
                                                                />
                                                                <span className="el-input__suffix">
                                                                    <span className="el-input__suffix-inner">
                                                                        <i className="fa-solid fa-chevron-down mt-2"></i>
                                                                    </span>
                                                                </span>
                                                            </div>

                                                            {showPaisDropdown && (
                                                                <div
                                                                    className="el-select-dropdown el-popper"
                                                                    style={{
                                                                        display: "block",
                                                                        minWidth: "375.658px",
                                                                        position: "absolute",
                                                                        top: "100%",
                                                                        left: 0,
                                                                        zIndex: 1000,
                                                                        maxHeight: "200px",
                                                                        overflowY: "auto",
                                                                    }}
                                                                >
                                                                    <div className="el-scrollbar">
                                                                        <div
                                                                            className="el-select-dropdown__wrap el-scrollbar__wrap"
                                                                            style={{
                                                                                marginBottom: "-15px",
                                                                                marginRight: "-15px",
                                                                            }}
                                                                        >
                                                                            <ul className="el-scrollbar__view el-select-dropdown__list">
                                                                                {countriesData.countries.map((country) => (
                                                                                    <li
                                                                                        key={country.code}
                                                                                        className={`el-select-dropdown__item${pais === country.name ? " selected" : ""}`}
                                                                                        onClick={() => handlePaisSelect(country.name)}
                                                                                        style={{ cursor: "pointer" }}
                                                                                    >
                                                                                        <span>{country.name}</span>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                        <div className="el-scrollbar__bar is-horizontal">
                                                                            <div
                                                                                className="el-scrollbar__thumb"
                                                                                style={{ transform: "translateX(0%)" }}
                                                                            ></div>
                                                                        </div>
                                                                        <div className="el-scrollbar__bar is-vertical">
                                                                            <div
                                                                                className="el-scrollbar__thumb"
                                                                                style={{ transform: "translateY(0%)" }}
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group hidden-dft">
                                                    <label>
                                                        <strong>Zona horaria</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend">
                                                                <i className="fas fa-clock"></i>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="Zona horaria"
                                                                className="el-input__inner"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group hidden-dft">
                                                    <label>
                                                        <strong>Celular</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend">
                                                                <img src={IconFlag} width={18} alt="Bandera" />{" "}
                                                                +54
                                                            </div>
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="9 11 2345-6789"
                                                                className="el-input__inner"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group hidden-dft">
                                                    <label>
                                                        <strong>Teléfono</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend">
                                                                <i className="fas fa-phone"></i>
                                                            </div>
                                                            <input
                                                                type="number"
                                                                autoComplete="off"
                                                                placeholder="Teléfono"
                                                                className="el-input__inner"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group input-group hidden-dft">
                                                    <label>
                                                        <strong>Dirección</strong>
                                                    </label>
                                                    <div className="input-group">
                                                        <div className="el-input el-input-group el-input-group--prepend">
                                                            <div className="el-input-group__prepend">
                                                                <i className="fas fa-map-marker-alt"></i>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder="Dirección"
                                                                className="el-input__inner"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    type="button"
                                                    className="el-button el-button--info is-plain"
                                                    style={{ margin: "auto" }}
                                                >
                                                    <span>Actualizar</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="d-xs-none col-md-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileEdit;
