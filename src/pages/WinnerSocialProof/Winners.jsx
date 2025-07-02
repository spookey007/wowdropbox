import React, { useEffect } from "react";
import GenericTable from "../../components/Generic/GenericTable/GenericTable";
import BackButton from "../../components/Generic/BackButton/BackButton";
import VideosGrid from "./VideosGrid";
import { useDispatch, useSelector } from "react-redux";
import { getSocialProofData } from "../../reducers/socialProofSlice/socialProofReducer";
import Layout from "../../components/Layout/Layout";
import { useTranslation } from "react-i18next";

const Winners = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.socialproof);
  const { socialProofList, threeWinners, isLoading } = result || {};

  const { t } = useTranslation();
  const columns = [
    { header: t("W&P.Rank"), accessor: "rank" },
    {
      header: t("W&P.Winner Name"),
      accessor: "W&P.Username",
      render: (row) => (
        <div className="flex items-center gap-2">
          <img
            src={row.avatar}
            alt={`${row.name} avatar`}
            className="w-8 h-8 rounded-full"
          />
          <span>{row.name}</span>
        </div>
      ),
    },
    { header: t("W&P.Prize"), accessor: "prize" },
    { header: t("W&P.Date"), accessor: "date" },
  ];

  useEffect(() => {
    dispatch(getSocialProofData());
  }, []);

  return (
    <Layout>
      <div className="layout-padding">
        <BackButton pageTitle={t("headings.Winners & Social Proof")} />
        <GenericTable
          columns={columns}
          data={threeWinners}
          isLoading={isLoading}
        />
        <VideosGrid socialProofList={socialProofList} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Winners;
