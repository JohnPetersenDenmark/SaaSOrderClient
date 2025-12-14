export type TenantConfig = {
  id: string;
  name: string;

  apiBaseUrl: string;

 

  theme: {
    primaryBackGroundColor: string;
    secondaryBackgroundColor?: string;
    thirdGreyBackgroundColor: string;
     primaryTextColor: string;
     secondaryTextColor: string;
      addToBasketHoverColor : string
     hoverMenuActions : string
    mode?: "light" | "dark";
  };

 marketing: {
    heroTitle: string;
    heroSubtitle1: string;
    heroSubtitle2: string;
    heroSubtitle3: string;
    heroSubtitle4: string;
    cta: string;
  };

  features: Record<string, boolean>;

  branding: {
    logo: string;
  };
};
