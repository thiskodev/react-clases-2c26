import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore'; 
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext"; 

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { signup } = useAuth(); 
  
  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    setError(null);

    try {
      // Creamos el usuario usando la función 'signup' del AuthContext
      const credencialUsuario = await signup(email, password);
      const user = credencialUsuario.user;

      // Guardamos los datos adicionales en Firestore usando el UID generado
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre,
        apellido: apellido,
        rol: "usuario", 
        email: email
      });

      // Redirigimos al inicio
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        const quiereLoguearse = window.confirm(
          "Este correo electrónico ya está registrado. ¿Desea intentar iniciar sesión?"
        );

        if (quiereLoguearse) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        setError(
          "Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente."
        );
        console.error("Error en el registro:", error.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear una nueva cuenta</h2>
      <form onSubmit={manejarSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(evento) => setApellido(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(evento) => setPassword(evento.target.value)}
            required
            placeholder="Minimo 6 caracteres"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;