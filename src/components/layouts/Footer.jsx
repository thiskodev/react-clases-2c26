import styles from './Footer.module.css';

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.footerNav}>
          <li className={styles.footerItem}>
            <a href="#acerca" className={styles.footerLink}>
              Acerca de Nosotros
            </a>
          </li>
          <li className={styles.footerItem}>
            <a href="#privacidad" className={styles.footerLink}>
              Política de Privacidad
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.copyrightContainer}>
        <p className={styles.copyright}>
          © {anioActual} <span className={styles.brand}>Fruteria</span> – Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;