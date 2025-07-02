import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  CartIcon,
  MenuIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
  TrophyIcon,
  InstagramIcon,
  TiktokIcon,
} from "../../utils/SvgIcons";
import Dropdown from "../Generic/Dropdowns/Dropdown";
import GeneralButton from "../Generic/GeneralButton";
import GenericModal from "../Generic/Generic-modal/GenericModal";
import Auth from "../Auth/Auth";
import ForgotPassword from "../Auth/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword";
import logo from "../../assets/Header/main-logo.png";
import { toggleLoginModal } from "../../reducers/commonSlice/commonReducer";
import { dropDownOptions, headerLinks } from "../../utils/StaticData";
import { getInitialTheme, queryString } from "../../utils/useFunc";

import "./Header.css";
import { useTranslation } from "react-i18next";
import { getUserDetails } from "../../reducers/userSlice/userReducer";
import { getUserCartItems } from "../../reducers/cartSlice/cartReducer";
import { showToastMessage } from "../../services/toastService";
import MobileSidebar from "./MobileSIdebar";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const iconMap = {
  trophy: <TrophyIcon />,
  instagram: <InstagramIcon />,
  tiktok: <TiktokIcon />,
};

const Header = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgethash } = queryString();
  const query = useQuery();

  const resultData = useSelector((state) => state.common);
  const result = useSelector((state) => state.box);
  const { winItemImage } = result || {};

  const userData = useSelector((state) => state.user);
  const { userDetails, userCartTotal } = userData || {};
  const { username, profile } = userDetails || {};
  const { showLogin } = resultData || {};

  const homePage = useLocation().pathname === "/";

  // Random profile picture
  const customProfile = "https://i.pravatar.cc/100";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const token = query.get("authToken");
    if (token) {
      localStorage.setItem("luckyBox#@user", token);
      navigate("/");
      dispatch(getUserDetails());
      dispatch(getUserCartItems());
    }
  }, [query]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error) {
      if (error === "blocked") {
        showToastMessage(
          "Your account has been blocked.",
          "error",
          "loginError"
        );
      } else {
        showToastMessage("Login failed", "error", "loginError");
      }
      navigate("/");
    }
  }, []);

  const ToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Main logo change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close Modal
  const handleModalClose = () => {
    dispatch(toggleLoginModal(false));
  };

  const handleSelectHeaderOption = (optionId) => {
    switch (optionId) {
      case "profile":
        navigate("/profile");
        break;
      case "orders":
        navigate("/my-orders");
        break;
      case "payment":
        navigate("/payment-history");
        break;
      case "signout":
        localStorage.removeItem("luckyBox#@user");
        window.location.href = "/";
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (forgethash) {
      setShowResetPassword(true);
    }
  }, [forgethash]);

  // Checking if user is logged in
  const isAuthenticated =
    localStorage.getItem("luckyBox#@user") &&
    Object.keys(userDetails).length > 0
      ? true
      : false;

  //locale
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang.toLowerCase());
  };

  const cartRef = useRef();
  useEffect(() => {
    if (userCartTotal && winItemImage) {
      cartRef.current.style.transform = "scale(1.1)";
    }

    setTimeout(() => {
      cartRef.current.style.transform = "scale(1)";
    }, 500);
  }, [userCartTotal]);

  return (
    <div className={`  header  `}>
      <div className="header-content-wrapper">
        <div className="lg:hidden block">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon />
          </button>
          <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div
          className={`  ${
            scrolled || !homePage
              ? "md:pl-[9.5rem] pl-[0rem]"
              : "md:pl-[12rem] pl-[0rem]"
          }  header-links transition-all duration-300 ease-in-out `}
        >
          {headerLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => navigate(link.path)}
              className="graffiti-header flex items-center gap-2"
            >
              {iconMap[link.icon]}
              {t(`header.${link.label}`)}
            </Link>
          ))}
        </div>

        <div
          className={`header-logo-container ${
            scrolled || !homePage ? "scrolled" : ""
          }`}
        >
          <img
            src={logo}
            alt="Logo"
            className={`header-logo  cursor-pointer `}
            onClick={() => navigate("/")}
          />
        </div>

        <div className="header-dropdowns">
          <div className="theme-toggle  md:flex hidden " onClick={ToggleTheme}>
            <span className="icon moon">
              <MoonIcon />
            </span>

            <div className="toggle-thumb"></div>
            <span className="icon sun">
              <SunIcon />
            </span>
          </div>

          <div className=" md:hidden block mr-2" onClick={ToggleTheme}>
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </div>

          <Dropdown
            label={i18n.language || "En"}
            options={[{ label: "En" }, { label: "Ru" }, { label: "Est" }]}
            onSelect={(option) => changeLanguage(option.label)}
          />
          {isAuthenticated && (
            <div
              className="mt-[4px] transition-all duration-300 ease-in-out  "
              ref={cartRef}
            >
              <button onClick={() => navigate("/cart")}>
                <CartIcon />
              </button>
              <span className="cart-count">{userCartTotal || 0}</span>
            </div>
          )}

          {isAuthenticated ? (
            <Dropdown
              type="auth"
              user={{
                name: username,
                avatar: profile ? profile : customProfile,
              }}
              options={dropDownOptions}
              onSelect={(option) => handleSelectHeaderOption(option.id)}
            />
          ) : (
            <GeneralButton
              variant="primary"
              className={"max-w-[120px]"}
              onClick={() => dispatch(toggleLoginModal(true))}
            >
              {t("auth.Login")}
            </GeneralButton>
          )}
        </div>
      </div>
      <GenericModal
        show={showLogin}
        handleClose={handleModalClose}
        title={t("auth.Login")}
        className={"max-w-[840px]"}
        isAuthModal={true}
      >
        <Auth showForgot={setShowForgotPassword} />
      </GenericModal>

      <GenericModal
        show={showForgotPassword}
        title={t("headings.Forgot Password")}
        className={"max-w-[448px]"}
        handleClose={() => setShowForgotPassword(false)}
      >
        <ForgotPassword forgotPassword={setShowForgotPassword} />
      </GenericModal>
      <GenericModal
        show={showResetPassword}
        title={t("headings.Reset Password")}
        className={"max-w-[448px]"}
        handleClose={() => setShowResetPassword(false)}
      >
        <ResetPassword
          closeResetPassword={setShowResetPassword}
          token={forgethash}
        />
      </GenericModal>
    </div>
  );
};

export default Header;
