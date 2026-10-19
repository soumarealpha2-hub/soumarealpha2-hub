import { Component, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import TradeOps from "../app/page";
import "../app/globals.css";
import "../app/fintech.css";
import "../app/academy.css";
import "../app/first-seat.css";

class PageRecovery extends Component<{children: ReactNode}, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() { return {failed: true}; }
  render() {
    if (this.state.failed) return <main className="academy ac-main" role="alert"><h1>This page couldn’t load.</h1><p>Refresh to load the current version. Your saved learning progress stays on this device.</p><button className="ac-button" onClick={() => window.location.reload()}>Refresh page</button></main>;
    return this.props.children;
  }
}

const container = document.getElementById("root");
if (!container) throw new Error("The app root element is missing.");
createRoot(container).render(<PageRecovery><TradeOps /></PageRecovery>);
