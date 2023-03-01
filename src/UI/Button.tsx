import classes from "../styles/Button.module.css";

type ButtonClassProps = {
  className: string;
  content: string;
};

export default function Button(props: ButtonClassProps) {
  const ButtonClassName = props.className;
  return <button className={classes[ButtonClassName]}>{props.content}</button>;
}
