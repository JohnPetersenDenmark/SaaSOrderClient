/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
       primaryBackgroundColor: "var(--primary-background-color)",
        secondaryBackgroundColor: "var(--secondary-background-color)",

         primaryTextColor: "var(--primary-text-color)",
        secondaryTextColor: "var(--secondary-text-color)",

        thirdBackgroundColor : "var(--third-background-color)",

        
        hoverMenuActionsColor : "var(--hover-menuactions-color)",
 addToBasketHoverColor: "var(--addto-basket-color)",
        
       
      },
    },
  },
  plugins: [],
};