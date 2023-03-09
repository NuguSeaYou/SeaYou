import classes from "../styles/MainPage.module.css";
import Button from "../UI/Button";
import firstTutorial from "../maps/FirstTutorial";

type MainPageProps = {
  onStart: React.MouseEventHandler<HTMLButtonElement>;
};

export default function MainPage(props: MainPageProps) {
  return (
    <main>
      <h1 className={classes.title}>NuguSeaYou</h1>
      <Button
        onClickEvent={props.onStart}
        className="start-button"
        content="시작하기"
      />
    </main>
  );
}
