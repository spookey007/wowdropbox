import React, { useState, useEffect } from "react";
import GeneralButton from "../Generic/GeneralButton";
import { Link, useNavigate } from "react-router-dom";

const AcceptCookies = ({ setCookiePopup }) => {
  const [hideAnimation, setHideAnimation] = useState(false);

  const navigate = useNavigate();
  const handleReject = () => {
    setHideAnimation(true);
    setTimeout(() => {
      setCookiePopup(false);
      localStorage.setItem("cookiesAccepted", "false");
    }, 300);
  };

  const handleAccept = () => {
    setHideAnimation(true);
    setTimeout(() => {
      localStorage.setItem("cookiesAccepted", "true");
      setCookiePopup(false);
    }, 300);
  };

  return (
    <div
      className={`accept-cookies fixed z-10 max-w-[1280px] bottom-0 w-full h-50 bg-[var(--card-bg)] md:flex-row flex-col gap-4 left-0 right-0 mx-auto py-6 px-12 rounded-md flex items-center justify-between border-t-[1px] border-primary transition-all duration-300 transform ${
        hideAnimation
          ? "translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-[var(--main-text)] text-xl font-bold  md:text-start text-center">
          Accept Cookies
        </h2>
        <p className="text-[var(--secondary-text)] text-md font-medium  md:text-start text-center max-w-[600px] ">
          We use cookies to improve your experience on our website. By using our
          website, you consent to the use of cookies.
        </p>
        <p className="text-[var(--secondary-text)] text-md font-medium  md:text-start text-center max-w-[600px] ">
          for more information please visit{" "}
          <Link target="_blank" to="/cookie-policy" className="text-primary">
            cookie policy
          </Link>
        </p>
      </div>

      <div className="flex gap-4">
        <GeneralButton
          variant={"primary"}
          className={"w-full"}
          onClick={handleAccept}
        >
          Accept
        </GeneralButton>
        <GeneralButton
          variant={"secondary"}
          className={"w-full"}
          onClick={handleReject}
        >
          Reject
        </GeneralButton>
      </div>
    </div>
  );
};

export default AcceptCookies;
