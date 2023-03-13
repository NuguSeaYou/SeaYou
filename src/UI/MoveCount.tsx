import { useEffect, useState } from "react";

type MoveCountProps = {
  initCount: number;
  moveCount: number;
}

function MoveCount(props: MoveCountProps) {
  const [count, setCount] = useState<number>(props.initCount);

  useEffect(() => {
    setCount(props.initCount - props.moveCount)
  }, [props.initCount, props.moveCount])

  return (
    <div>카운터입니다 {count}</div>
  )
}

export default MoveCount;