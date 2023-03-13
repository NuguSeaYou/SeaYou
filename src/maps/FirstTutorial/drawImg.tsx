type drawImgProps = {
  canvas: React.RefObject<HTMLCanvasElement>;
  newImage: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export default function drawImg({
  canvas,
  newImage,
  x,
  y,
  w,
  h,
}: drawImgProps) {
  const img = new Image();
  img.src = newImage;
  const canvasCur = canvas.current as HTMLCanvasElement;
  const context = canvasCur.getContext("2d");
  context?.drawImage(img, x, y, w, h);
}
