import { useState } from "react";
import "../styles/Login.scss"
import { useNavigate } from "react-router-dom"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    try {
      const response = await fetch (`${import.meta.env.VITE_API_RESERVA_FACIL}/auth/iniciar-sesion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, contrasena})
      })

      /* Get data after fetching */
      const loggedIn = await response.json()
      

      if (loggedIn.user) {
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }

    } catch (err) {
      console.log("Login failed", err)
    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit} >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <a href="/registrarse">No tienes una cuenta? Registrate Aquí</a>
      </div>
    </div>
  );
};

export default LoginPage;