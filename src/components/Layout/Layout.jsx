import { useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import LiveDropsSlider from "../Livedrops/Livedrops";
import "./Layout.css";
import { useEffect, useState } from "react";
import AcceptCookies from "../AcceptCookies/AcceptCookies";

const Layout = ({ children }) => {
  const location = useLocation();

  const [cookiePopup, setCookiePopup] = useState(true);
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="app-root">
      <Header />
      {location.pathname === "/" && <LiveDropsSlider />}
      <div className="main-content layout-container min-h-[calc(100vh-390px)]">
        {children}
      </div>
      {cookiePopup && !cookiesAccepted && (
        <AcceptCookies setCookiePopup={setCookiePopup} />
      )}
      <Footer />
    </div>
  );
};

export default Layout;
