import Nav from "./Nav";
import { Link } from "react-router-dom";
import styles from "./Header.module.css"; 

const Header = () => {
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
      </header>
    </div>
  );
};;

export default Header;