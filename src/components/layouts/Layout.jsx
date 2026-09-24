import estilo from "./Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className={estilo.mainWrapper}>
      <Header />
      <main className={estilo.content}>
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
