import { ButtonHTMLAttributes, Component } from "react";
import "./submitBtn.scss";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLInputElement> {
  caption: string;
}

class SubmitBtn extends Component<SubmitButtonProps> {
  render() {
    return <button type="submit">{this.props.caption}</button>;
  }
}
export default SubmitBtn;
