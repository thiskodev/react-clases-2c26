import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // usamos el custom hook
  const { login } = useAuth(); 

  const manejarLogin = async (evento) => {
    evento.preventDefault();
    try {
      await login(email, password);
      alert("¡Inicio de sesión exitoso!");
      navigate("/");
    } catch (error) {
      console.error("Error en el login:", error.code, error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(evento) => setPassword(evento.target.value)}
        />
        <button type="submit">Ingresar</button>
        <br/>
        No estás registrado? <Link to="/registro">Regístrate</Link>
      </form>
    </div>
  );
};

export default Login;