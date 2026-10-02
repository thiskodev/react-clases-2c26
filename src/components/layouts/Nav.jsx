import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { useCarrito } from '../../context/CarritoContext';

const Nav = () => {
  const { itemsEnCarrito } = useCarrito();
  const totalItems = itemsEnCarrito();
  
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navLink}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/productos" className={styles.navLink}>
            Productos
          </Link>
        </li>
        <li>
          <Link to="/contacto" className={styles.navLink}>
            Contacto
          </Link>
          
        </li>
        <li>
          <Link to="/carrito">🛒 {totalItems > 0 &&
            <span>{totalItems}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;