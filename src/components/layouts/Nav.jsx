import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {

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
      </ul>
    </nav>
  );
}

export default Nav;