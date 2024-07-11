import { InputHTMLAttributes, ReactElement } from "react";
import "./submitBtn.scss";

function SubmitBtn({
  ...props
}: InputHTMLAttributes<HTMLInputElement>): ReactElement {
  return <input type="submit" value={props.value} {...props}></input>;
}

export default SubmitBtn;
