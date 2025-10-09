import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import { callApi } from "../utils/Utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { contextData } = useContext(AppContext);
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        code: "",
        currency: "8"
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Basic validation
        if (!formData.username || !formData.email || !formData.password) {
            toast.error("Por favor completa todos los campos obligatorios");
            setIsLoading(false);
            return;
        }

        try {
            let body = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            };

            const result = await callApi(
                contextData,
                "POST",
                "/auth/register",
                handleRegisterResponse,
                JSON.stringify(body)
            );
        } catch (error) {
            toast.error("Error de conexión. Intenta nuevamente.");
            setIsLoading(false);
        }
    };

    const handleRegisterResponse = (result) => {
        setIsLoading(false);
        
        if (result.status === 200 || result.status === "success") {
            toast.success("¡Registro exitoso! Redirigiendo...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else if (result.status === 500 || result.status === 422) {
            toast.error(result.message || "Error en el registro");
        } else {
            toast.error("Error desconocido. Intenta nuevamente.");
        }
    };

    return (
        <div className="main container-fluid main-static kb-whitelabel-auth-register">
            
            <article className="card-body mx-auto content-relog" style={{ maxWidth: "300px" }}>
                <h4 style={{ textAlign: "center", color: "#fff", textTransform: "uppercase", letterSpacing: "3px" }}>
                    Crear cuenta
                </h4>

                <form className="frmAuthRegister2 frmAuthRegisterSend" onSubmit={handleSubmit}>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text input-group-text-icon">
                                <i className="fa fa-user"></i>
                            </span>
                        </div>
                        <input 
                            name="username" 
                            required 
                            className="form-control form-control-auth btn-md" 
                            placeholder="Usuario" 
                            value={formData.username}
                            onChange={handleInputChange}
                            type="text" 
                        />
                    </div>

                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text input-group-text-icon">
                                <i className="fa fa-envelope"></i>
                            </span>
                        </div>
                        <input 
                            name="email" 
                            required 
                            className="form-control form-control-auth btn-md" 
                            placeholder="Correo Electrónico" 
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email" 
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
                            required 
                            className="form-control form-control-auth btn-md" 
                            placeholder="Contraseña" 
                            value={formData.password}
                            onChange={handleInputChange}
                            type="password" 
                        />
                    </div>

                    <div className="form-group input-group afiliate-code">
                        <div className="input-group-prepend">
                            <span className="input-group-text input-group-text-icon">
                                <i className="fa fa-barcode"></i>
                            </span>
                        </div>
                        <input 
                            name="code" 
                            className="form-control form-control-auth btn-md codeagent" 
                            placeholder="Código de Afiliado" 
                            value={formData.code}
                            onChange={handleInputChange}
                            type="text" 
                        />
                    </div>

                    <div className="form-group input-group">
                        <select 
                            className="form-control" 
                            name="currency"
                            value={formData.currency}
                            onChange={handleInputChange}
                        >
                            <option value="8">AR$ ARS</option>
                            <option value="89">₲ PYG</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button 
                            type="submit" 
                            className="btn btn-re btn-danger btn-green-ct btn-md btn-block btn-submit reg-submit btnVerifyGRC"
                            disabled={isLoading}
                        >
                            {isLoading ? "Registrando..." : "Registrarse"}
                        </button>
                    </div>

                    <div className="form-group text-center">
                        <p style={{ color: "#fff", fontSize: "14px" }}>
                            ¿Ya tienes una cuenta?{" "}
                            <a 
                                href="/login" 
                                style={{ color: "#f47a20", textDecoration: "none" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/login");
                                }}
                            >
                                Inicia sesión aquí
                            </a>
                        </p>
                    </div>

                    <label className="form-group" id="check-term" style={{ color: "#fff", fontSize: "12px" }}>
                        <input type="checkbox" required style={{ marginRight: "5px" }} />
                        Al registrarme acepto los Términos y Condiciones.
                    </label>
                </form>
            </article>
        </div>
    );
};

export default Register;
