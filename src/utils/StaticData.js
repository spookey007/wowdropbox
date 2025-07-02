
export const dropDownOptions = [
  { label: "Your profile", id: "profile" },
  { label: "My orders", id: "orders" },
  { label: "Transactions", id: "payment" },
  { label: "Sign out", id: "signout" },
];

export const BoxData = [
  {
    id: 1,
    name: "Sneakers",
    price: 100.0,
    image:
      "https://mysteryopening.com/_next/image?url=https%3A%2F%2Fcontent.gdbnetwork.com%2Fpublic%2Fmysteryopening%2Fupload%2F1738691145756.png&w=256&q=100",
  },
  {
    id: 2,
    name: "Scented",
    price: 100.0,
    image:
      "https://mysteryopening.com/_next/image?url=https%3A%2F%2Fcontent.gdbnetwork.com%2Fpublic%2Fmysteryopening%2Fupload%2F1745419344599.png&w=256&q=100",
  },
  {
    id: 3,
    name: "Watches",
    price: 100.0,
    image:
      "https://mysteryopening.com/_next/image?url=https%3A%2F%2Fcontent.gdbnetwork.com%2Fpublic%2Fmysteryopening%2Fupload%2F1738098552785.png&w=256&q=100",
  },
  {
    id: 4,
    name: "Sneakers",
    price: 100.0,
    image:
      "https://mysteryopening.com/_next/image?url=https%3A%2F%2Fcontent.gdbnetwork.com%2Fpublic%2Fmysteryopening%2Fupload%2F1738691145756.png&w=256&q=100",
  },
  {
    id: 5,
    name: "Scented",
    price: 100.0,
    image:
      "https://mysteryopening.com/_next/image?url=https%3A%2F%2Fcontent.gdbnetwork.com%2Fpublic%2Fmysteryopening%2Fupload%2F1745419344599.png&w=256&q=100",
  },
  {
    id: 6,
    name: "Watches",
    price: 100.0,
    image:
      "https://mysteryopening.com/_next/image?url=https%3A%2F%2Fcontent.gdbnetwork.com%2Fpublic%2Fmysteryopening%2Fupload%2F1738098552785.png&w=256&q=100",
  },
];

export const BoxFilters = [
  { id: 1, name: "New Boxes" },
  { id: 2, name: "Sneakers" },
  { id: 3, name: "Street wear" },
  { id: 4, name: "Accessories" },
];

export const boxItem = [
  {
    name: "item 1",
    price: 22,
    url: "https://example.com/image1.png",
    background: "red",
    border: "red",
    colorName: "red",
  },
  {
    name: "item 1",
    price: 22,
    url: "https://example.com/image1.png",
    background: "red",
    border: "red",
    colorName: "red",
  },
];

export const boxDetails = {
  _id: "6808c17c2038353e95e6a416",
  name: "Demo Box",
  image:
    "https://cslucky-game.s3.amazonaws.com/brandLogos/01ab46bb1c4b8b33adcc05f7d40862db.png",
  color: "undefined",
  price: null,
  description: "",
  category: [
    {
      _id: "67c92c825b3b29e3f202732f",
      name: "Featured",
    },
    {
      _id: "67c92c6b5b3b29e3f2027324",
      name: "New",
    },
  ],
  isDeleted: false,
  boxItems: [
    {
      pid: {
        _id: "678897bfa8f84cc5fcd98dd4",
        name: "Samsung Watch",
        categoryId: [],
        price: 20,
        color: [],
        image: [],
        skinWear: "Unknown",
        quickSell: false,
        rarityLevel: {
          _id: "67330af632ae7259bfa270d8",
          name: "GOLD",
          color: "#fff",
        },
        bannerImage:
          "https://img-prd-pim.poorvika.com/product/samsung-galaxy-watch-ultra-lte-titanium-gray-47-mm-sm-l705fdaains-left-view.png",
        visibility: true,
      },
      chance: 50,
      addonBlance: 0,
      range: "1-500000",
      inexpensiveItems: true,
      _id: "6808c17c2038353e95e6a417",
    },
    {
      pid: {
        _id: "67889801ae9a7bb10908d340",
        name: "Iphone 16",
        categoryId: [],
        price: 10,
        color: [],
        image: [],
        skinWear: "Unknown",
        quickSell: false,
        rarityLevel: {
          _id: "67330af632ae7259bfa270d8",
          name: "GOLD",
          color: "#fff",
        },
        bannerImage:
          "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/Apple-iphone-16-ultramarine-128gb-Back-Left-View.png",
        visibility: true,
      },
      chance: 45,
      addonBlance: 0,
      range: "500001-950000",
      inexpensiveItems: true,
      _id: "6808c17c2038353e95e6a418",
    },
    {
      pid: {
        _id: "678898323877706ebd28d8c5",
        name: "Apple Watch",
        categoryId: [],
        price: 15,
        color: [],
        image: [],
        skinWear: "Unknown",
        quickSell: false,
        rarityLevel: {
          _id: "67330af632ae7259bfa270d8",
          name: "GOLD",
          color: "#fff",
        },
        bannerImage:
          "https://fastexpo.net/wp-content/smush-webp/2019/10/Apple-Watch-Apple-Watch-Iwatch-PNG-Image.png.webp",
        visibility: true,
      },
      chance: 5,
      addonBlance: 0,
      range: "950001-1000000",
      inexpensiveItems: false,
      _id: "6808c17c2038353e95e6a419",
    },
  ],
  probility: "",
  specialTag: [
    {
      label: "New",
      value: "new",
    },
  ],
  caseSpecialTag: [],
  profitMargin: 20,
  itemsCount: 3,
  featuredcase: false,
  hideBox: true,
  priceCategory: 5,
  freeBox: false,
  enableBox: false,
  boxBattle: true,
  boxlevel: "5",
  createdAt: "2025-04-23T10:31:24.810Z",
  updatedAt: "2025-04-24T09:46:31.096Z",
  __v: 0,
  openingCount: 2,
};

export const boxProductList = [
  {
    pid: {
      _id: "678897bfa8f84cc5fcd98dd4",
      name: "Samsung Watch",
      categoryId: [],
      price: 0.22,
      color: [],
      image: [],
      skinWear: "Unknown",
      quickSell: false,
      rarityLevel: {
        _id: "67330af632ae7259bfa270d8",
        name: "GOLD",
        color: "#fff",
      },
      bannerImage:
        "https://img-prd-pim.poorvika.com/product/samsung-galaxy-watch-ultra-lte-titanium-gray-47-mm-sm-l705fdaains-left-view.png",
      visibility: true,
    },
    chance: 50,
    addonBlance: 0,
    range: "1-500000",
    inexpensiveItems: true,
    _id: "6808c17c2038353e95e6a417",
  },
  {
    pid: {
      _id: "67889801ae9a7bb10908d340",
      name: "Iphone 16",
      categoryId: [],
      price: 0,
      color: [],
      image: [],
      skinWear: "Unknown",
      quickSell: false,
      rarityLevel: {
        _id: "67330af632ae7259bfa270d8",
        name: "GOLD",
        color: "#fff",
      },
      bannerImage:
        "https://img-prd-pim.poorvika.com/cdn-cgi/image/width=500,height=500,quality=75/product/Apple-iphone-16-ultramarine-128gb-Back-Left-View.png",
      visibility: true,
    },
    chance: 45,
    addonBlance: 0,
    range: "500001-950000",
    inexpensiveItems: true,
    _id: "6808c17c2038353e95e6a418",
  },
  {
    pid: {
      _id: "678898323877706ebd28d8c5",
      name: "Apple Watch",
      categoryId: [],
      price: 15,
      color: [],
      image: [],
      skinWear: "Unknown",
      quickSell: false,
      rarityLevel: {
        _id: "67330af632ae7259bfa270d8",
        name: "GOLD",
        color: "#fff",
      },
      bannerImage:
        "https://fastexpo.net/wp-content/smush-webp/2019/10/Apple-Watch-Apple-Watch-Iwatch-PNG-Image.png.webp",
      visibility: true,
    },
    chance: 5,
    addonBlance: 0,
    range: "950001-1000000",
    inexpensiveItems: false,
    _id: "6808c17c2038353e95e6a419",
  },
];

export const getFaqs = (t) => {
  return [
    {
      title: t("FAQ.q1"),
      content: t("FAQ.a1"),
    },
    {
      title: t("FAQ.q2"),
      content: t("FAQ.a2"),
    },
    {
      title: t("FAQ.q3"),
      content: t("FAQ.a3"),
    },
    {
      title: t("FAQ.q4"),
      content: t("FAQ.a4"),
    },
    {
      title: t("FAQ.q5"),
      content: t("FAQ.a5"),
    },
    {
      title: t("FAQ.q6"),
      content: t("FAQ.a6"),
    },
    {
      title: t("FAQ.q7"),
      content: t("FAQ.a7"),
    },
    {
      title: t("FAQ.q8"),
      content: t("FAQ.a8"),
    },
    {
      title: t("FAQ.q9"),
      content: t("FAQ.a9"),
    },
    {
      title: t("FAQ.q10"),
      content: t("FAQ.a10"),
    },
    {
      title: t("FAQ.q11"),
      content: t("FAQ.a11"),
    },
    {
      title: t("FAQ.q12"),
      content: t("FAQ.a12"),
    },
    {
      title: t("FAQ.q13"),
      content: t("FAQ.a13"),
    },
  ];
};

export const liveDrops = [
  {
    boxId: {
      _id: "box1",
      name: "Mystery Treasure",
      image:
        "https://cdn.lootbox.com/cdn-cgi/imagedelivery/rTXt6fLp3ziq8Ml3JML3Mw/f3488245-b1fe-4ab4-4118-51ebae9a3c00/public",
    },
    pid: {
      bannerImage:
        "https://png.pngtree.com/png-clipart/20250104/original/pngtree-ps-5-or-playstation-set-with-game-controller-png-image_19792765.png",
      price: 49.99,
    },
    userId: { username: "PlayerOne" },
    result: { chance: 12.5 },
    battleId: "battle123",
  },
  {
    boxId: {
      _id: "box2",
      name: "Dragon's Hoard",
      image:
        "https://cdn.lootbox.com/cdn-cgi/imagedelivery/rTXt6fLp3ziq8Ml3JML3Mw/f3488245-b1fe-4ab4-4118-51ebae9a3c00/public",
    },
    pid: {
      bannerImage:
        "https://png.pngtree.com/png-clipart/20250104/original/pngtree-ps-5-or-playstation-set-with-game-controller-png-image_19792765.png",
      price: 89.99,
    },
    userId: { username: "DragonSlayer" },
    result: { chance: 7.8 },
    battleId: "battle456",
  },
  {
    boxId: {
      _id: "box3",
      name: "Enchanted Vault",
      image:
        "https://cdn.lootbox.com/cdn-cgi/imagedelivery/rTXt6fLp3ziq8Ml3JML3Mw/f3488245-b1fe-4ab4-4118-51ebae9a3c00/public",
    },
    pid: {
      bannerImage:
        "https://png.pngtree.com/png-clipart/20250104/original/pngtree-ps-5-or-playstation-set-with-game-controller-png-image_19792765.png",
      price: 15.0,
    },
    userId: { username: "MagicWanderer" },
    result: { chance: 25.4 },
    battleId: "battle789",
  },
  {
    boxId: {
      _id: "box4",
      name: "Shadow Chest",
      image:
        "https://cdn.lootbox.com/cdn-cgi/imagedelivery/rTXt6fLp3ziq8Ml3JML3Mw/f3488245-b1fe-4ab4-4118-51ebae9a3c00/public",
    },
    pid: {
      bannerImage:
        "https://png.pngtree.com/png-clipart/20250104/original/pngtree-ps-5-or-playstation-set-with-game-controller-png-image_19792765.png",
      price: 120.0,
    },
    userId: { username: "ShadowKnight" },
    result: { chance: 3.2 },
    battleId: "battle101",
  },
  {
    boxId: {
      _id: "box5",
      name: "Frozen Relic",
      image:
        "https://cdn.lootbox.com/cdn-cgi/imagedelivery/rTXt6fLp3ziq8Ml3JML3Mw/f3488245-b1fe-4ab4-4118-51ebae9a3c00/public",
    },
    pid: {
      bannerImage:
        "https://png.pngtree.com/png-clipart/20250104/original/pngtree-ps-5-or-playstation-set-with-game-controller-png-image_19792765.png",
      price: 120.0,
    },
    userId: { username: "ShadowKnight" },
    result: { chance: 3.2 },
    battleId: "battle101",
  },
  {
    boxId: {
      _id: "box6",
      name: "Golden Fortune",
      image:
        "https://cdn.lootbox.com/cdn-cgi/imagedelivery/rTXt6fLp3ziq8Ml3JML3Mw/f3488245-b1fe-4ab4-4118-51ebae9a3c00/public",
    },
    pid: {
      bannerImage:
        "https://png.pngtree.com/png-clipart/20250104/original/pngtree-ps-5-or-playstation-set-with-game-controller-png-image_19792765.png",
      price: 120.0,
    },
    userId: { username: "ShadowKnight" },
    result: { chance: 3.2 },
    battleId: "battle101",
  },
  {
    boxId: {
      _id: "box7",
      name: "Ancient Scroll",
      image:
        "https://cdn.lootbox.com/cdn-cgi/imagedelivery/rTXt6fLp3ziq8Ml3JML3Mw/f3488245-b1fe-4ab4-4118-51ebae9a3c00/public",
    },
    pid: {
      bannerImage:
        "https://png.pngtree.com/png-clipart/20250104/original/pngtree-ps-5-or-playstation-set-with-game-controller-png-image_19792765.png",
      price: 120.0,
    },
    userId: { username: "ShadowKnight" },
    result: { chance: 3.2 },
    battleId: "battle101",
  },
  {
    boxId: {
      _id: "box8",
      name: "Phantom Crate",
      image:
        "https://cdn.lootbox.com/cdn-cgi/imagedelivery/rTXt6fLp3ziq8Ml3JML3Mw/f3488245-b1fe-4ab4-4118-51ebae9a3c00/public",
    },
    pid: {
      bannerImage:
        "https://png.pngtree.com/png-clipart/20250104/original/pngtree-ps-5-or-playstation-set-with-game-controller-png-image_19792765.png",
      price: 120.0,
    },
    userId: { username: "ShadowKnight" },
    result: { chance: 3.2 },
    battleId: "battle101",
  },
];

export const OrdersData = [
  {
    id: "ORD-1001",
    date: "2025-05-15",
    items: "2x T-shirts, 1x Jeans",
    amount: "$89.99",
    status: "Processing",
  },
  {
    id: "ORD-1002",
    date: "2025-05-10",
    items: "1x Jacket",
    amount: "$120.00",
    status: "Shipped",
  },
  {
    id: "ORD-1003",
    date: "2025-04-22",
    items: "3x Shoes",
    amount: "$210.50",
    status: "Delivered",
  },
  {
    id: "ORD-1004",
    date: "2025-04-15",
    items: "2x T-shirts, 1x Jeans",
    amount: "$89.99",
    status: "Cancelled",
  },
];

export const cardType = [
  {
    name: "Visa",
  },
  {
    name: "mastercard",
  },
  {
    name: "American Express",
  },
];

export const headerLinks = [
  { label: "Winners & Social Proof", path: "/winners", icon: "trophy" },
  { label: "Instagram", path: "", icon: "instagram" },
  { label: "Tiktok", path: "", icon: "tiktok" },
];

export const returnOrderReasonsEn = [
  { label: "Received Wrong Item" },
  { label: "Product Damaged or Defective" },
  { label: "Other Reason" },
];

export const returnOrderReasonsRu = [
  { label: "Получен неправильный товар" },
  { label: "Товар поврежден или неисправен" },
  { label: "Другая причина" },
];

export const returnOrderReasonsEst = [
  { label: "Saadi vale toode" },
  { label: "Toode on kahjustatud või defektne" },
  { label: "Muu põhjus" },
];
