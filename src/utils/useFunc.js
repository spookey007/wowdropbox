export const queryString = () => {
  let query = window.location.search.substr(1);
  let resultval = {};
  query.split("&").forEach((part) => {
    let item = part.split("=");
    resultval[item[0]] = decodeURIComponent(item[1]);
  });
  return resultval;
};

export const getPrice = (value, position) => {
  const storeValue = Number(value).toFixed(2);
  const result = storeValue.split(".");
  return result[position];
};
export const getClientSeed = () => {
  const rand = () => Math.random(0).toString(36).substr(2);
  const token = (length) =>
    (rand() + rand() + rand() + rand()).substr(0, length);
  return token(32);
};

export const handleBoxPrice = (daata, profitMargin) => {
  const houseEdgePercentage = parseFloat(profitMargin) / 100;
  let totalPriceOfItems = 0;
  daata.forEach((el) => {
    const prodPrice = el?.pid?.price;
    if (prodPrice && el.chance) {
      const res = prodPrice * (parseFloat(el?.chance) / 100);
      const finalRes = res.toFixed(2);
      totalPriceOfItems += parseFloat(finalRes);
    }
  });
  const houseEdge = 1 - houseEdgePercentage;
  const finalBoxPrice = totalPriceOfItems / houseEdge;
  return finalBoxPrice;
};

export const getInitialTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) return storedTheme;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

export const getStatusColor = (status) => {
  switch (status) {
    case "processing":
      return " border-yellow-500 bg-yellow-300";
    case "shipped":
      return "border-blue-500 bg-blue-300";
    case "delivered":
      return " border-green-500 bg-green-300";
    case "denied":
      return " border-red-500 bg-red-300";
    case "succeeded":
      return " border-green-500 bg-green-300";
    case "cancel":
      return " border-red-500 bg-red-300";
    default:
      return " border-gray-500 bg-gray-300";
  }
};

//  2025-05-20T13:21:09.332Z -> 2025-05-20 13:21:09
export const formatDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const splitPrefix = (text) => {
  const match = text?.match(/^(\d+-)/);
  if (!match) return { removed: "", cleaned: text };
  const removedPart = match ? match[0] : "";
  const cleanedText = text.replace(/^(\d+-)/, "");
  return {
    removed: removedPart,
    cleaned: cleanedText,
  };
};
