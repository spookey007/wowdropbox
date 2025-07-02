import React, { useEffect, useState } from "react";
import BackButton from "../../components/Generic/BackButton/BackButton";
import Dropdown from "../../components/Generic/Dropdowns/Dropdown";
import GenericInput from "../../components/Generic/GenericInput/GenericInput";
import { SearchIcon } from "../../utils/SvgIcons";
import GenericTable from "../../components/Generic/GenericTable/GenericTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaymentHistory,
  updatePaymentPageDetails,
} from "../../reducers/paymentSlice/paymentReducer";
import GenericPagination from "../../components/Generic/GenericPagination/GenericPagination";
import { getStatusColor } from "../../utils/useFunc";
import Layout from "../../components/Layout/Layout";
import { useTranslation } from "react-i18next";

const PaymentHistory = () => {
  const [searchInput, setSearchInput] = useState("");
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const columns = [
    { header: t("Transactions.Date"), accessor: "date" },
    { header: t("Transactions.Box name"), accessor: "boxname" },
    { header: t("Transactions.Currency"), accessor: "currency" },
    { header: t("Transactions.Amount"), accessor: "amount" },
    {
      header: t("Transactions.Status"),
      render: (row) => (
        <span
          className={`font-semibold text-[#000] ${getStatusColor(
            row?.status
          )} border rounded-full px-2 py-0.5 whitespace-nowrap`}
        >
          {t(`Transactions.${row?.status}`)}
        </span>
      ),
    },
  ];

  const { paymentHistory, isLoading, paymentPageDetails } = useSelector(
    (state) => state.payment
  );
  useEffect(() => {
    dispatch(getPaymentHistory(paymentPageDetails));
  }, [
    dispatch,
    paymentPageDetails.page,
    paymentPageDetails.search,
    paymentPageDetails.status,
    paymentPageDetails.sort,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updatePaymentPageDetails({ search: searchInput, page: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);

  const handlePageChange = (selectedItem) => {
    dispatch(updatePaymentPageDetails({ page: selectedItem?.selected + 1 }));
  };

  return (
    <Layout>
      <div className="layout-padding">
        <BackButton pageTitle={t("headings.Payment History")} />

        <div className="my-4">
          <div className="flex items-center lg:flex-row flex-col gap-4 w-full justify-between">
            <GenericInput
              placeholder={t("Transactions.Search by box name")}
              className="lg:max-w-[500px] max-w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              prefixIcon={<SearchIcon />}
            />

            {/* <div className="flex w-1/2 md:justify-end justify-center gap-4">
              <Dropdown
                label={
                  (paymentPageDetails?.status &&
                    t(`Transactions.${paymentPageDetails?.status}`)) ||
                  t("general.Status")
                }
                options={[
                  { label: t("Transactions.succeeded"), value: "succeeded" },
                  { label: t("Transactions.failed"), value: "failed" },
                ]}
                onSelect={(option) =>
                  dispatch(
                    updatePaymentPageDetails({
                      status: option.value,
                      page: 1,
                    })
                  )
                }
              />

              <Dropdown
                label={
                  (paymentPageDetails?.sort &&
                    t(`Transactions.${paymentPageDetails?.sort}`)) ||
                  t("general.Sort By")
                }
                options={[
                  { label: t("general.Desc"), value: "desc" },
                  { label: t("general.Asc"), value: "asc" },
                ]}
                onSelect={(option) =>
                  dispatch(
                    updatePaymentPageDetails({
                      sort: option.value,
                      page: 1,
                    })
                  )
                }
              />
            </div> */}
          </div>
        </div>

        <GenericTable
          columns={columns}
          data={paymentHistory}
          isLoading={isLoading?.getPaymentHistory}
        />

        <GenericPagination
          pageCount={paymentPageDetails?.totalPages}
          forcePage={paymentPageDetails?.page - 1}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
};

export default PaymentHistory;
