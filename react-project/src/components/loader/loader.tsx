import { ReactElement } from "react";
import "./loader.scss";
import logo from "../../assets/3.svg";

function Loader(): ReactElement {
  return (
    <div className="loader">
      <img src={logo} alt="logo" />
    </div>
  );
}

export default Loader;
