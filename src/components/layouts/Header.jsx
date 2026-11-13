import Nav from "./Nav";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSearch } from "../../context/SearchContext";
import styles from "./Header.module.css";
import SearchIcon from "../../assets/icons/SearchIcon";

const Header = () => {

  const { user, logout } = useAuth();
  const { busqueda, setBusqueda } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const manejarCambio = (evento) => {
    const valor = evento.target.value;
    setBusqueda(valor);

    // Si el usuario escribe y no esta en la page productos, lo llevamos alli
    if (location.pathname !== "/productos") {
      navigate("/productos");
    }
  };

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
        {/* Barra de Busqueda */}
        <form
          className={styles.searchForm}
          onSubmit={(evento) => evento.preventDefault()}
        >
          <input
            type="text"
            placeholder="Buscar productos..."
            className={styles.searchInput}
            value={busqueda}
            onChange={manejarCambio}
          />
          {busqueda && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setBusqueda("")}
            >
              ✕
            </button>
          )}
        </form>
        {/* Auth */} 
        <div>
          <ul>
            {user ? (
              <>
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