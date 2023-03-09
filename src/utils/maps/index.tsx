type contentsType = {
  [key: string]: valueType;
};

type valueType = {
  id: number;
  imgURL: string;
  imgSize: number;
};

const imgSize = 50;

const contents: contentsType = {
  Background: { id: 0, imgURL: "/", imgSize },
  User: { id: 1, imgURL: "/baba.png", imgSize },
  Brick: { id: 2, imgURL: "/brick.png", imgSize },
  Rock: { id: 3, imgURL: "/rock.png", imgSize },
  Flag: { id: 4, imgURL: "/flag.png", imgSize },
};

export const tutorialMap1 = {
  width: 9 * imgSize,
  height: 5 * imgSize,
  userPostion: [2, 2],
  contents: { ...contents },
  map: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 0, 0, 0, 2, 0, 0, 0, 3],
    [3, 0, 1, 0, 2, 0, 4, 0, 3],
    [3, 0, 0, 0, 2, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3],
  ],
};

export const tutorialMap2 = {
  width: 8 * imgSize,
  height: 11 * imgSize,
  userPosition: [2, 2],
  contents: { ...contents },
  map: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 3, 3, 3, 3, 3, 3],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [0, 1, 0, 2, 0, 0, 4, 0],
    [0, 0, 0, 2, 0, 0, 0, 0],
    [3, 3, 3, 3, 3, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
};
