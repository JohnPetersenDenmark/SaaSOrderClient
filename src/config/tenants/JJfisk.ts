import type { TenantConfig } from "../types";


const JJfisk: TenantConfig = {
  id: "JJfisk",
  name: "JJfisk ApS",

   apiBaseUrl: "http://192.168.1.52:5000",
//apiBaseUrl: "http://www.dotnetdev.dk",
  

  theme: {
    primaryBackGroundColor: "#5470a9",
    secondaryBackgroundColor: "Grey",
    primaryTextColor: '#ffffff',
    secondaryTextColor: '#000000',
    hoverMenuActions: "#ffb84d",
    mode: "light"
  },

  features: {
    orders: true,
    inventory: false
  },
  
 marketing: {
    heroTitle: "JJ Fisk - En seriøs fiskehandler",
    heroSubtitle1: "VI KØRER I HELE MIDTJYLLAND",
    heroSubtitle2: "Friske fisk i Aarhus og Midtjylland",
    heroSubtitle3: " J Fisk holder til i Hasselager, hvor vi producerer alle vores varer og pakker vores fiskebiler op hver morgen. I kan her på siden se i hvilket område de 6 mobile fiskevogne holder til. I kan følge os på Facebook eller kontakte bilerne direkte i åbningstiden.",
    heroSubtitle4: " Her finder du vores 6 mobile fiskeforretninger",
    cta: "",
  },

  branding: {
    logo: "/images/jjfisk_logo.svg"
  }
};

export default JJfisk;