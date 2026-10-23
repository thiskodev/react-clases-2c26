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
          <Link to="/mujer" className={styles.navLink}>
            Mujer
          </Link>
        </li>
        <li>
          <Link to="/hombre" className={styles.navLink}>
            Hombre
          </Link>
        </li>
        <li>
          <Link to="/panel" className={styles.navLink}>
            Panel
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