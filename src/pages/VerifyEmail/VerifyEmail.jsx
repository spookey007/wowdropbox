import React, { useEffect } from "react";
import logo from "../../assets/Header/main-logo.png";
import { queryString } from "../../utils/useFunc";

import "./VerifyEmail.css";
import GeneralButton from "../../components/Generic/GeneralButton";
import { toggleLoginModal } from "../../reducers/commonSlice/commonReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userVerification } from "../../reducers/authSlice/authReducer";
import { showToastMessage } from "../../services/toastService";

function EmailVerify() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { emailVerificationHash } = queryString();

  const handleVerifyClick = () => {
    navigate("/");
    dispatch(toggleLoginModal(true));
  };

  useEffect(() => {
    dispatch(userVerification({ emailVerificationHash })).then((response) => {
      if (response?.payload?.resultData?.code === 200) {
        showToastMessage(
          response?.payload?.resultData?.msg,
          "success",
          "verifySucc"
        );
      } else if (response?.payload?.resultData?.code === 404) {
        navigate("/");
      } else {
        navigate("/");
      }
    });
  }, [dispatch]);

  return (
    <>
      <div className="verify-email layout-padding">
        <div className="verify-message-inner">
          <div className="verify-inner-logo">
            <img src={logo} alt="" />
          </div>
          <div className="verify-message">
            <h2>Thank You for Verification!!</h2>
            <h4>
              {" "}
              You’re all set. Start opening boxes and win exciting prizes now!
            </h4>
          </div>
          <div class="now-login-btn">
            <GeneralButton
              className={"w-[200px]"}
              variant="primary"
              onClick={handleVerifyClick}>
              <span>Login</span>
            </GeneralButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerify;
