import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import GeneralButton from "../Generic/GeneralButton";
import {
  deleteAddress,
  getUserDetails,
  setDefaultAddress,
} from "../../reducers/userSlice/userReducer";
import { showToastMessage } from "../../services/toastService";
import ConfirmationModal from "../Generic/Confirmation/ConfirmationModal";
import { translateDynamicContent } from "../../utils/translateDynamicContent";

const AddressCard = ({ item, setSelectedAddress, setShowAddressForm }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { isLoading } = useSelector((state) => state.user);

  const currentLanguage = i18n.language;

  //Set as default
  const handleDefault = () => {
    try {
      dispatch(setDefaultAddress(item._id)).then((res) => {
        const { code, msg } = res?.payload?.resultData || {};

        if (code === 200) {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "success",
            "Address updated successfully"
          );
          dispatch(getUserDetails());
        } else {
          showToastMessage(msg, "error", "Address update failed");
        }
      });
    } catch (error) {
      const msg = error?.msg || "Address update failed";
      showToastMessage(msg, "error", "Address update failed", () => {
        dispatch(getUserDetails());
      });
    }
  };

  const handleDeleteAddress = () => {
    try {
      dispatch(deleteAddress(item._id)).then((res) => {
        const { code, msg } = res?.payload?.resultData || {};

        if (code === 200) {
          showToastMessage(
            translateDynamicContent(msg, currentLanguage),
            "success",
            "Address deleted successfully"
          );
          dispatch(getUserDetails());
          setShowAddressForm(false);
          setSelectedAddress(null);
        } else {
          showToastMessage(msg, "error", "Address delete failed");
        }
      });
    } catch (error) {
      const msg = error?.msg || "Address delete failed";
      showToastMessage(msg, "error", "Address delete failed");
    }
  };

  return (
    <div
      className={`address-item relative cursor-pointer border hover:border-primary border-[var(--card-bg)] ${
        item.isDefault ? "border border-primary " : ""
      }`}>
      {item.isDefault ? (
        <span className="absolute  md:text-md text-sm top-2 right-2 bg-primary text-[#000] font-semibold rounded py-1 px-2 ">
          {t("profile.Default")}
        </span>
      ) : (
        <span
          className="absolute top-2 right-2  md:text-md text-sm text-[var(--main-text)] font-semibold rounded py-1 px-2 "
          onClick={() => handleDefault()}>
          {t("profile.Set as default")}
        </span>
      )}

      <div>
        <h3>
          {item.firstname} {item.lastname}
        </h3>
        <p>
          {item.addressLine1} {item.addressLine2} {item.city}
        </p>
        <p>
          {item.state} {item.country} - {item.zipCode}
        </p>
        <p>
          {item.countryCode}
          {"-"}
          {item.mobile}
        </p>
      </div>
      <div className="flex sm:gap-4 sm:flex-row flex-col gap-1">
        <GeneralButton
          variant="primary"
          className={"mt-4 w-full"}
          onClick={() => {
            setSelectedAddress(item);
            setShowAddressForm(true);
          }}>
          {t("general.Edit")}{" "}
        </GeneralButton>
        <GeneralButton
          variant="secondary"
          className={"mt-4 w-full"}
          onClick={() => setShowConfirm(true)}>
          {t("general.Delete")}
        </GeneralButton>
      </div>
      <ConfirmationModal
        isLoading={isLoading?.deleteAddress}
        showModal={showConfirm}
        setShowModal={setShowConfirm}
        handleConfirm={handleDeleteAddress}
        type={t("confirmation.dynamicMessage")}
      />
    </div>
  );
};

export default AddressCard;
