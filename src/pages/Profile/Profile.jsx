import React, { useState } from "react";
import { useSelector } from "react-redux";

import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfo from "../../components/profile/PersonalInfo";
import ShippingAddress from "../../components/profile/ShippingAddress";
import AddressCard from "../../components/profile/AddressCard";
import GeneralButton from "../../components/Generic/GeneralButton";
import "./Profile.css";
import { useTranslation } from "react-i18next";
import { CloseIcon } from "../../utils/SvgIcons";
import Layout from "../../components/Layout/Layout";

const Profile = () => {
  const [addressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { t } = useTranslation();
  const userData = useSelector((state) => state.user);
  const { userDetails } = userData || {};
  const addressLength = userDetails?.shippingAddress?.length === 0;
  return (
    <Layout>
      <div className="profile-page layout-padding ">
        <ProfileHeader userDetails={userDetails} />
        <PersonalInfo userDetails={userDetails} />

        <div>
          <div className="flex justify-between items-center">
            <h2 className="shipping-address-title">
              {t("profile.Shipping Address")}
            </h2>

            {!addressLength &&
              (!addressForm ? (
                <GeneralButton
                  variant="primary"
                  className={" w-[200px] "}
                  onClick={() => {
                    setSelectedAddress(null);
                    setShowAddressForm(!addressForm);
                  }}
                >
                  {t("profile.Add address")}
                </GeneralButton>
              ) : (
                <GeneralButton
                  variant={"icon"}
                  onClick={() => setShowAddressForm(!addressForm)}
                >
                  <CloseIcon />
                </GeneralButton>
              ))}
          </div>
          {(addressForm || addressLength) && (
            <ShippingAddress
              selectedAddress={selectedAddress}
              setShowAddressForm={setShowAddressForm}
            />
          )}
          {userDetails?.shippingAddress?.length > 0 && (
            <div className="address-list grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userDetails?.shippingAddress?.map((item) => (
                <AddressCard
                  item={item}
                  key={item._id}
                  setSelectedAddress={setSelectedAddress}
                  setShowAddressForm={setShowAddressForm}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
