import classes from "../styles/MainPage.module.css";
import Button from "../UI/Button";

export default function MainPage() {
  return (
    <main>
      <h1 className={classes.title}>NuguSeaYou</h1>
      <Button className="start-button" content="시작하기" />
    </main>
  );
}
