import classes from "../styles/Button.module.css";
import React from "react";

type ButtonClassProps = {
  className: string;
  content: string;
  onClickEvent: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button(props: ButtonClassProps) {
  const ButtonClassName = props.className;
  return (
    <button onClick={props.onClickEvent} className={classes[ButtonClassName]}>
      {props.content}
    </button>
  );
}
