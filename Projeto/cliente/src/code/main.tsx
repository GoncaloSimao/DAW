import "normalize.css";
import "../css/main.css";

// Library imports.
import React from "react";
import ReactDOM from "react-dom/client" ;


import BaseLayout from "./components/BaseLayout";


//create root
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
//render baseLayout
root.render(<BaseLayout />);

