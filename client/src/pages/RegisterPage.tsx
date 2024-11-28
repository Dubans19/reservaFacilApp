import { useEffect, useState } from "react";

import "../styles/Register.scss";
import "../assets/uploadPhoto.png";
import UploadIcon from "@mui/icons-material/Upload";
import { useNavigate } from "react-router-dom";
// import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';
const RegisterPage = () => {
    const navigate = useNavigate()
    // const [mostrarAlerta, setmostrarAlerta] = useState(false)
    const [formData, setformData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        contrasena: "",
        confirmarContrasena: "",
        imagenPerfil: null as File | null,
    });
    console.log(formData.imagenPerfil)

    const handleChange = (e: any) => {
        const { name, value, files } = e.target
        setformData({
            ...formData,
            [name]: value,
            [name]: name === "imagenPerfil" ? files ? files[0] : null : value
        })

    }

    const [passwordMatch, setpasswordMatch] = useState(true)
    useEffect(() => {
        setpasswordMatch(formData.contrasena === formData.confirmarContrasena || formData.confirmarContrasena === "")
    })
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (formData.contrasena === formData.confirmarContrasena) {
            setpasswordMatch(true)
        } else {
            setpasswordMatch(false)
        }

        try {
            const register_form = new FormData()
            for (let key of Object.keys(formData) as Array<keyof typeof formData>) {
                // Obtén el valor del campo
                const value = formData[key];
            
                // Omite el campo 'confirmarContrasena' y agrega los demás campos
                if (key !== 'confirmarContrasena' && value !== null) {
                    register_form.append(key, value);
                }
            }

            const response = await fetch(`${import.meta.env.VITE_API_RESERVA_FACIL}/registrarse`, {
                method: 'POST',
                body: register_form,
            })
            if (response.ok) {
                // setmostrarAlerta(true)
                navigate("/iniciar-sesion")
                
            }

        } catch (error) {
            console.log("registration fallo", error)

        }


    }
    return (
        <div className="register">
            
            <h1>Registrarse ReservaFacil</h1>
            <div className="register_content">

                <form className="register_content_form" onSubmit={handleSubmit}>
                    <input
                        placeholder="Nombre"
                        name="nombre"
                        onChange={handleChange}
                        required
                        value={formData.nombre}
                    />
                    <input
                        placeholder="Apellido"
                        name="apellido"
                        onChange={handleChange}
                        required
                        value={formData.apellido}
                    />

                    <input
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        required
                        value={formData.email}
                    />

                    <input
                        placeholder="Contraseña"
                        name="contrasena"
                        type="password"
                        onChange={handleChange}
                        required
                        value={formData.contrasena}
                    />
                    <input
                        placeholder="Confirmar Contraseña"
                        name="confirmarContrasena"
                        type="password"
                        onChange={handleChange}
                        required
                        value={formData.confirmarContrasena}
                    />
                    {!passwordMatch && (
                        <p style={{ color: "orange" }}>Las contraseñas no coinciden</p>
                    )}
                    <input
                        id="image"
                        type="file"
                        name="imagenPerfil"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        style={{ display: "none" }}
                    ></input>

                    <label htmlFor="image">
                        <UploadIcon style={{ color: "orange" }}></UploadIcon>
                        <p>Sube tu foto</p>
                    </label>
                    {formData.imagenPerfil && (
                        <img src={URL.createObjectURL(formData.imagenPerfil)}
                            alt="imagen de perfil"
                            style={{ maxWidth: "80px" }}
                        ></img>
                    )}
                    <button disabled={!passwordMatch}>REGISTRARSE</button>
                </form>
                <a href="/iniciar-sesion">Ya tienes una cuenta? Inicia sesion aquí</a>
            </div>
   
        </div>
    );
};

export default RegisterPage;
