import { createRoot } from "react-dom/client";
import App from "./app/App";
import { AppProviders } from "./app/AppProviders";
import "./index.css";

const root = createRoot(document.getElementById("app")!);


root.render(
   <AppProviders>
     <App />
   </AppProviders> 
);
