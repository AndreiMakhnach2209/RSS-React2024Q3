import { ReactElement } from "react";
import logo from "../../assets/3.svg";

function EmptySearch(): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "60vh",
        width: "80vw",
      }}
      data-testid="not-found-cards"
    >
      <img src={logo} alt="logo" style={{ height: "100%", width: "100%" }} />
      <p style={{ fontSize: "20px" }}>Pokemon not found</p>
    </div>
  );
}

export default EmptySearch;
