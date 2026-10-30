import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import styles from "./Header.module.css"; 

const Header = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className={styles.headerWrapper}>
      <header className={styles.headerContainer}>
        <div className={styles.brandSection}>
          <Link to="/" className={styles.brandLogo}>
            Fruteria
          </Link>
        </div>
        <div className={styles.centerSection}>
          <Nav />
        </div>
        <div>
          <ul>
            {/* Logica de renderizado condicional */}
            {user ? (
              <>
                {/* Mostrar panel SOLO si el usuario es admin */}
                {user.rol === "admin" && (
                  <li>
                    <Link to="/panel" style={{ color: "black" }}>
                      Panel
                    </Link>
                  </li>
                )}
                <span>¡Hola, {user.email}!</span>
                <button onClick={logout}>Cerrar Sesión</button>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;