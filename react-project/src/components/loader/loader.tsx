import { Component } from "react";
import "./loader.scss";
import logo from "../../assets/3.svg";

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <img src={logo} alt="logo" />
      </div>
    );
  }
}

export default Loader;
