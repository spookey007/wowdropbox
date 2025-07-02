/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from "../../components/MyOrders/OrderDetail";
import GenericTable from "../../components/Generic/GenericTable/GenericTable";
import GeneralButton from "../../components/Generic/GeneralButton";
import GenericInput from "../../components/Generic/GenericInput/GenericInput";
import Dropdown from "../../components/Generic/Dropdowns/Dropdown";
import GenericModal from "../../components/Generic/Generic-modal/GenericModal";
import {
  fetchOrdersList,
  updatePageDetails,
} from "../../reducers/checkOutSlice/checkOutReducer";

import { getStatusColor, splitPrefix } from "../../utils/useFunc";
import { SearchIcon } from "../../utils/SvgIcons";
import BackButton from "../../components/Generic/BackButton/BackButton";
import GenericPagination from "../../components/Generic/GenericPagination/GenericPagination";
import Layout from "../../components/Layout/Layout";
import { useTranslation } from "react-i18next";

const MyOrders = () => {
  const dispatch = useDispatch();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [showCancelReason, setShowCancelReason] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { t } = useTranslation();

  const { isLoading, ordersList, pageDetails } = useSelector(
    (state) => state.checkout
  );

  useEffect(() => {
    dispatch(fetchOrdersList(pageDetails));
  }, [
    dispatch,
    pageDetails.page,
    pageDetails.search,
    pageDetails.status,
    pageDetails.sort,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(updatePageDetails({ search: searchInput, page: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);

  const handlePageChange = (selectedItem) => {
    dispatch(updatePageDetails({ page: selectedItem?.selected + 1 }));
  };

  const handleShowOrderDetails = (orderId) => {
    setShowOrderDetails(true);
    setSelectedOrderId(orderId);
  };

  const columns = [
    { header: t("Orders.Order ID"), accessor: "id" },
    { header: t("Orders.Order Date"), accessor: "date" },
    { header: t("Orders.Items"), accessor: "items" },
    { header: t("Orders.Quantity"), accessor: "quantity" },
    // { header: t("Orders.Total Amount"), accessor: "amount" },
    {
      header: t("Orders.Current Status"),
      render: (row) => (
        <span
          className={`font-semibold text-[#000] ${getStatusColor(
            row?.status
          )} border rounded-full px-2 py-0.5 whitespace-nowrap`}>
          {`${
            splitPrefix(row?.status)?.removed
              ? `${splitPrefix(row?.status)?.removed}`
              : ""
          }`}
          {t(`Orders.${splitPrefix(row?.status)?.cleaned}`)}
        </span>
      ),
    },
    {
      header: t("Orders.Actions"),
      render: (row) => (
        <GeneralButton
          variant="primary"
          className="max-w-[300px]"
          onClick={() => handleShowOrderDetails(row._id)}>
          {t("Orders.View Details")}
        </GeneralButton>
      ),
    },
  ];

  return (
    <Layout>
      <div className="layout-padding">
        <BackButton pageTitle={t("headings.My Orders")} />

        <div className="my-4">
          <div className="flex items-center lg:flex-row flex-col gap-4 w-full justify-between">
            <GenericInput
              placeholder={t("Orders.Search")}
              className="lg:max-w-[500px] max-w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              prefixIcon={<SearchIcon />}
            />

            {/* <div className="flex w-1/2 md:justify-end justify-center gap-4">
              <Dropdown
                label={t("general.Status")}
                options={[
                  { label: t("Orders.processing"), value: "processing" },
                  { label: t("Orders.shipped"), value: "shipped" },
                  { label: t("Orders.delivered"), value: "delivered" },
                  { label: t("Orders.cancel"), value: "cancel" },
                  { label: t("Orders.pending"), value: "pending" },
                  { label: t("Orders.returned"), value: "return" },
                ]}
                onSelect={(option) =>
                  dispatch(updatePageDetails({ status: option.value, page: 1 }))
                }
              />

              <Dropdown
                label={pageDetails.sort || t("general.Sort By")}
                options={[
                  { label: t("general.Desc") },
                  { label: t("general.Asc") },
                ]}
                onSelect={(option) =>
                  dispatch(updatePageDetails({ sort: option.label, page: 1 }))
                }
              />
            </div> */}
          </div>
        </div>

        <GenericTable
          isLoading={isLoading.allOrders}
          columns={columns}
          data={ordersList}
          noDataTitle={t("Orders.orders")}
        />

        <GenericPagination
          pageCount={pageDetails?.totalPages}
          forcePage={pageDetails?.page - 1}
          onPageChange={handlePageChange}
        />

        <GenericModal
          show={showOrderDetails}
          className={"max-w-[700px]"}
          handleClose={() => {
            setShowOrderDetails(false);
            setShowReturnForm(false);
            setShowCancelReason(false);
          }}
          title={
            showReturnForm
              ? t("headings.Return Order")
              : t("headings.Order Details")
          }>
          <OrderDetail
            showReturnForm={showReturnForm}
            setShowReturnForm={setShowReturnForm}
            selectedOrderId={selectedOrderId}
            setShowOrderDetails={setShowOrderDetails}
            setShowCancelReason={setShowCancelReason}
            showCancelReason={showCancelReason}
          />
        </GenericModal>
      </div>
    </Layout>
  );
};

export default MyOrders;
