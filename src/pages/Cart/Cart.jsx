import React, { useEffect, useMemo, useState } from "react";

import BackButton from "../../components/Generic/BackButton/BackButton";
import GenericInput from "../../components/Generic/GenericInput/GenericInput";
import Dropdown from "../../components/Generic/Dropdowns/Dropdown";
import CartItem from "../../components/Cart/CartItem";
import GeneralButton from "../../components/Generic/GeneralButton";
import { SearchIcon } from "../../utils/SvgIcons";

import "./Cart.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoaderCard } from "../../components/CardsLoader/LoaderCard";
import { getUserCartItems } from "../../reducers/cartSlice/cartReducer";
import NoData from "../../components/Generic/NoData";
import Layout from "../../components/Layout/Layout";

const Cart = () => {
  const { t } = useTranslation();
  const result = useSelector((state) => state.cart);
  const { cartItems, /*cartTotal*/ isLoading } = result || {};
  const { getCart: cartLoader } = isLoading || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(t("cart.High"));
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCartItems());
  }, [dispatch]);

  // Select single items
  const selectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
      return;
    }
    setSelectedItems([...selectedItems, item]);
  };

  // Filter and sort
  const filteredItems = useMemo(() => {
    let items = [...cartItems];

    // Filter by name
    if (searchTerm) {
      items = items.filter((item) =>
        item?.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by price
    if (sortOrder === "High") {
      items.sort((a, b) => b?.productId?.sellPrice - a?.productId?.sellPrice);
    } else {
      items.sort((a, b) => a?.productId?.sellPrice - b?.productId?.sellPrice);
    }

    return items;
  }, [cartItems, searchTerm, sortOrder]);

  const removeOutOfStockItems = filteredItems?.filter(
    (item) => item?.productId.totalProduct > 0
  );

  // Total Amount to pay
  // const totalAmount = selectedItems.reduce(
  //   (total, item) => total + item?.productId?.sellPrice,
  //   0
  // );

  const handleSelectAll = () => {
    if (selectedItems.length === removeOutOfStockItems?.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(removeOutOfStockItems);
    }
  };
  const handleProceedToCheckout = (selectedItems) => {
    if (selectedItems?.length === 0) {
      return;
    }
    if (selectedItems?.some((item) => item?.productId?.totalProduct === 0)) {
      return;
    }
    let invenIds = [];
    const map = new Map();
    selectedItems.forEach((item) => {
      invenIds.push(item._id);
      const productId = item.productId._id;
      const price = item?.productId.sellPrice;
      const name = item?.productId?.name;
      const productImage = item?.productId?.bannerImage;
      if (map.has(productId)) {
        map.get(productId).quantity += 1;
      } else {
        map.set(productId, {
          productId,
          price,
          name,
          productImage,
          quantity: 1,
        });
      }
    });
    const productDetails = Array.from(map.values());
    const payload = {
      invenIds,
      productDetails,
    };
    navigate("/checkout", { state: payload });
  };

  const outOfStockItems = cartItems?.filter(
    (item) => item?.productId?.totalProduct === 0
  );

  const disableSelectAll = outOfStockItems.length === cartItems.length;

  return (
    <Layout>
      <div className="layout-padding">
        <BackButton pageTitle={t("headings.Cart")} />

        <div className="cart-container  bg-[var(--modal-bg)] rounded-[12px]">
          {/* cart header  */}
          <div className="flex justify-between lg:flex-row flex-col lg:gap-0 gap-4 items-center p-8 border-b border-[var(--card-bg)]  ">
            <div className="flex items-center lg:flex-row flex-col gap-4 lg:w-1/2 w-full">
              <GenericInput
                placeholder={t("cart.Search")}
                className="lg:max-w-[500px] max-w-full "
                prefixIcon={<SearchIcon />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <h2 className="text-[var(--secondary-text)] whitespace-nowrap">
                {t("cart.Selected Items")} : {selectedItems?.length}
              </h2>
              <h2 className="text-[var(--secondary-text)] whitespace-nowrap">
                {t("cart.Total Items")} : {cartItems?.length || 0}
              </h2>
            </div>

            <div className="flex items-center gap-4  ">
              <div class="flex items-center  ">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  disabled={disableSelectAll}
                  checked={
                    selectedItems?.length === removeOutOfStockItems?.length &&
                    !disableSelectAll
                  }
                  onChange={handleSelectAll}
                  className={`w-4 h-4 text-[var(--primary-color)] bg-[transparent] border border-[#A3A3B7] rounded-sm checked:bg-[var(--primary-color)] checked:border-[var(--primary-color)] appearance-none cursor-pointer  ${
                    disableSelectAll && "cursor-not-allowed opacity-50"
                  } `}
                />
                <label
                  for="default-checkbox"
                  className={`ms-2 text-md font-medium text-[var(--secondary-text)] whitespace-nowrap  ${
                    disableSelectAll && "cursor-not-allowed opacity-50"
                  }`}
                >
                  {t("cart.Select all")}
                </label>
              </div>

              <div className="flex items-center gap-2">
                <label className="ms-2 text-md font-medium text-[var(--secondary-text)]">
                  {t("cart.Price")}
                </label>
                <Dropdown
                  label={sortOrder}
                  options={[
                    { label: t("cart.High") },
                    { label: t("cart.Low") },
                  ]}
                  onSelect={(val) => setSortOrder(val.label)}
                />
              </div>
            </div>
          </div>

          {/* items section  */}
          <div className="md:py-2 py-4  md:px-4 px-2  cart-items grid gap-[20px] lg:grid-cols-5  md:grid-cols-4 grid-cols-2 max-h-[500px] overflow-y-auto cart-list  ">
            {!cartLoader ? (
              filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <CartItem
                    key={item?.id}
                    item={item}
                    selectedItems={selectedItems}
                    onClick={() => selectItem(item)}
                  />
                ))
              ) : (
                <NoData title={"general.cart items"} />
              )
            ) : (
              Array(10)
                .fill(null)
                .map((_, index) => <LoaderCard key={index} />)
            )}
          </div>

          {/* Cart Footer */}
          <div className="bg-[var(--card-bg)] p-4 flex sm:flex-row flex-col gap-8 justify-end items-center ">
            {/* <h2 className="text-[var(--secondary-text)] font-semibold ">
              {t("cart.Amount")} : $ {totalAmount}{" "}
            </h2> */}
            <GeneralButton
              variant={"primary"}
              disabled={selectedItems?.length === 0}
              onClick={() => handleProceedToCheckout(selectedItems)}
            >
              {t("cart.Proceed to checkout")}
            </GeneralButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
