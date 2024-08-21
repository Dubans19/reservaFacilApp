import { useState } from "react";
import "../styles/Register.scss";
import "../assets/uploadPhoto.png";
import UploadIcon from "@mui/icons-material/Upload";
const RegisterPage = () => {
  const [formData, setformData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
    imagenPerfil: null,
  });
  console.log(formData)

  const handleChange=(e:any)=>{
    const {name,value,files}=e.target
    setformData({
        ...formData,
        [name]:value,
        [name]:name=="imagenPerfil" ? files[0]:value
    })

  }
  return (
    <div className="register">
          <h1>Registrarse ReservaFacil</h1>
      <div className="register_content">
      
        <form className="register_content_form">
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
            <UploadIcon style={{ color: "white" }}></UploadIcon>

            <p>Sube tu foto</p>
          </label>
          {formData.imagenPerfil &&(
            <img src={URL.createObjectURL(formData.imagenPerfil)}
            alt="imagen de perfil"
            style={{maxWidth:"80px"}}
            ></img>
          )}
          <button>REGISTRARSE</button>
        </form>
        <a href="/iniciar-sesion">Ya tienes una cuenta? Inicia sesion aquí</a>
      </div>
    </div>
  );
};

export default RegisterPage;
