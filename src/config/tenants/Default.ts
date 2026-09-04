import type { TenantConfig } from "../types";

const Default: TenantConfig = {
 id: "Default",
  name: "Default ApS",

     apiBaseUrl: "http://192.168.1.17:5000",


  theme: {
    primaryBackGroundColor: "Green",
    secondaryBackgroundColor: "#6610f2",
      addToBasketHoverColor : "green",
     thirdGreyBackgroundColor : "blue",
    primaryTextColor : 'Blue',
     secondaryTextColor : '#000000',
     hoverMenuActions : "Black",
    mode: "light"
  },

  features: {
    orders: true,
    inventory: false
  },

  marketing: {
    heroTitle: "Default food  - En seriøs foodhandler",
   heroSubtitle1: "Fiskebiler",
    heroSubtitle2: "Fiskebiler",
    heroSubtitle3: "Fiskebiler",
    heroSubtitle4: "Fiskebiler",
    cta: "",
  },

  branding: {
    logo: "/images/vite.svg"
  }
};
export default Default;

