import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  autoUpdateUserIneventoryCount,
  getUserDetails,
} from "./reducers/userSlice/userReducer";
import {
  getBox,
  getBoxCategoryForFilter,
} from "./reducers/boxesSlice/boxReducer";

import {
  autoUpdate,
  getLiveDrops,
} from "./reducers/liveDropSlice/liveDropReducer";

import Home from "./pages/Home/Home";
import ProvablyFair from "./pages/Information/ProvablyFair";
import { BoxDetails } from "./components/BoxDetails/BoxDetails";
import Profile from "./pages/Profile/Profile";
import TermOfService from "./pages/Information/TermOfService";
import ReturnPolicy from "./pages/Information/ReturnPolicy";
import PrivacyPolicy from "./pages/Information/PrivacyPolicy";
import ContactUs from "./pages/Information/ContactUs";
import ShippingRefund from "./pages/Information/Shipping&Refund";
import FAQ from "./pages/Information/FAQ";
import EmailVerify from "./pages/VerifyEmail/VerifyEmail";
import PrivateRoute from "./utils/PrivateRoute";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

import "./App.css";
import CookiePolicy from "./pages/Information/CookiePolicy";
import Feedback from "./pages/Feedback/Feedback";
import MyOrders from "./pages/MyOrders/MyOrders";

import BoxPayment from "./pages/BoxPayment/BoxPayment";

import PaymentHistory from "./pages/PaymentHistory/PaymentHistory";
import Winners from "./pages/WinnerSocialProof/Winners";
import NotFound from "./pages/NotFound/NotFound";
import mainLogo from "./assets/Header/main-logo.png";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("luckyBox#@user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails());
    }
  }, [dispatch, token]);
  
  useEffect(() => {
    dispatch(autoUpdateUserIneventoryCount());
    dispatch(getBoxCategoryForFilter());
    dispatch(getBox());
    dispatch(getLiveDrops());
    dispatch(autoUpdate());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="global-loader-bg">
        <div className="global-loader-retro">
          <img src={mainLogo} alt="Logo" className="global-loader-logo" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/terms-of-service" element={<TermOfService />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shipping-refund" element={<ShippingRefund />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/provably-fair" element={<ProvablyFair />} />
        <Route path="/boxs-details" element={<BoxDetails />} />
        <Route path="/box-payment" element={<BoxPayment />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verify-email" element={<EmailVerify />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
