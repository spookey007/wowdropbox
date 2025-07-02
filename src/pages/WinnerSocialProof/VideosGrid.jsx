import { useTranslation } from "react-i18next";
import { translateDynamicContent } from "../../utils/translateDynamicContent";
import NoData from "../../components/Generic/NoData";

const VideosGrid = ({ socialProofList, isLoading }) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <div className="mt-8">
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : socialProofList?.length > 0 ? (
          socialProofList?.map((elem) => (
            <div
              key={elem._id}
              className="bg-[var(--card-bg)] rounded-lg p-4 shadow-md  hover:scale-105 transition-transform duration-300">
              <video
                controls
                controlsList="nodownload"
                disablePictureInPicture
                className="w-full h-48 object-cover rounded-lg">
                <source src={elem?.video} type="video/mp4" />
              </video>
              <h2 className="text-lg font-semibold mt-2 text-[var(--main-text)]">
                {translateDynamicContent(elem?.title, currentLanguage)}
              </h2>
            </div>
          ))
        ) : (
          <NoData title={t("general.Videos")} />
        )}
      </div>
    </div>
  );
};

export default VideosGrid;
