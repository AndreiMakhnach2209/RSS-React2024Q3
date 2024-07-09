import { Component, InputHTMLAttributes } from "react";
import "./submitBtn.scss";

class SubmitBtn extends Component<InputHTMLAttributes<HTMLInputElement>> {
  render() {
    return <input type="submit" value={this.props.value}></input>;
  }
}
export default SubmitBtn;
