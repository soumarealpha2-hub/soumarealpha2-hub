import { createRoot } from "react-dom/client";
import TradeOps from "../app/page";
import "../app/globals.css";
import "../app/fintech.css";
import "../app/academy.css";

const container = document.getElementById("root");
if (!container) throw new Error("The app root element is missing.");
createRoot(container).render(<TradeOps />);
