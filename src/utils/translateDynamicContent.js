export const translateDynamicContent = (name, lang) => {
  if (!name || !lang) return "";
  if(!name.includes("~")) return name
  const splitBoxName = name?.split("~").map((str) => str.trim());
  switch (lang.toLowerCase()) {
    case "en":
      return splitBoxName[0] || "";
    case "ru":
      return splitBoxName[1] || "";
    case "est":
      return splitBoxName[2] || "";
    default:
      return splitBoxName[0] || "";
  }
};
