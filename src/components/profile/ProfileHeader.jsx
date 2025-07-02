import React from "react";
import BackButton from "../Generic/BackButton/BackButton";
import { CameraIcon } from "../../utils/SvgIcons";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  uploadProfileImage,
} from "../../reducers/userSlice/userReducer";
import { showToastMessage } from "../../services/toastService";
import Loader from "../Generic/Loader";
import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../utils/translateDynamicContent";

const ProfileHeader = ({ userDetails }) => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const result = useSelector((state) => state.user);
  const { isLoading } = result || {};

  // Uploading profile picture
  const handlePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = /^image\/(jpeg|png|jpg|gif|webp)$/;
    const msg =
      "Only image files (jpg, jpeg, png, gif, webp) are allowed ~ Разрешены только файлы изображений (jpg, jpeg, png, gif, webp) ~ Lubatud on ainult pildifailid (jpg, jpeg, png, gif, webp)";
    if (!allowedTypes.test(file.type)) {
      showToastMessage(
        translateDynamicContent(msg, currentLanguage),
        "error",
        "Invalid file type"
      );
      return;
    }

    const formData = new FormData();
    if (e.target.files.length > 0) {
      formData.append("file", e.target.files[0]);
      dispatch(uploadProfileImage(formData))
        .then((res) => {
          const { code, msg } = res?.payload?.resultData || {};
          if (code === 200) {
            showToastMessage(
              translateDynamicContent(msg, currentLanguage),
              "success",
              "Profile picture updated successfully"
            );
            dispatch(getUserDetails());
          } else {
            showToastMessage(msg, "error", "Profile picture update failed");
          }
        })
        .catch((error) => {
          const msg = error?.msg || "Profile picture update failed";
          showToastMessage(msg, "error", "Profile picture update failed");
        });
    }
  };

  return (
    <div>
      <BackButton pageTitle={t("headings.Profile")} />
      <div className="profile-header">
        <div className="flex gap-4 items-center md:flex-row flex-col">
          <div className="profile-image-container relative">
            {isLoading.uploadProfileImage ? (
              <div className="flex justify-center items-center h-full">
                <Loader color="fill-[var(--primary-color)]" />
              </div>
            ) : (
              <img
                src={
                  userDetails?.profile ||
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png"
                }
                alt="Profile"
                className="profile-image"
              />
            )}

            <button
              className="absolute cursor-pointer  bottom-0 camera-icon right-[-5px] "
              disabled={isLoading.uploadProfileImage}>
              <div className="avatar-edit ">
                <input
                  type="file"
                  id="imageUpload"
                  name="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handlePicUpload}
                />
              </div>
              <CameraIcon />
            </button>
          </div>
          <div className="flex flex-col gap-2 user-info md:items-start items-center  ">
            <h2>@{userDetails?.username}</h2>
            <h3>{userDetails?.email}</h3>
          </div>
        </div>

        <div className="md:w-1/2 w-full flex md:justify-between justify-center profile-stats">
          {/* <div className="flex flex-col gap-2">
            <h2>{userDetails?.unboxedBoxes || 0}</h2>
            <h3>{t("profile.Unboxed Boxes")}</h3>
          </div> */}

          <div className="flex flex-col gap-2">
            <h2>{userDetails?.unboxedBoxesCount || 0}</h2>
            <h3>{t("profile.Unboxed Boxes")}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
