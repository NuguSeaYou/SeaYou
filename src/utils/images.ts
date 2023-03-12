const init: { [key: string]: HTMLImageElement } = {};
const imageSrc: { [key: string]: string } = {
  "baba": "/images/baba.png", 
  "background": "/images/bg.png",
  "rock": "/images/rock.png",
  "wall": "/images/brick.png",
  "flag": "/images/flag.png",
  "flagTile": "/images/flagTile.png",
  "isTile": "/images/isTile.png",
  "pushTile": "/images/pushTile.png",
  "rockTile": "/images/rockTile.png",
  "seaTile": "/images/seaTile.png",
  "stopTile": "/images/stopTile.png",
  "wallTile": "/images/wallTile.png",
  "winTile": "/images/winTile.png",
  "youTile": "/images/youTile.png",
};

const Images = Object.entries(imageSrc).reduce(
  (images, [key, value]) => {
    const imageInfo = new Image();
    imageInfo.src = value;
    images[key] = imageInfo;
    return images
  }, init);

export default Images;