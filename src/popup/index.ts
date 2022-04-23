import React from "react";
import ReactDOM from "react-dom/client";
import { Popup } from "./Popup";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(React.createElement(Popup, {}, null));
