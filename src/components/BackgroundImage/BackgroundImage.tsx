import "./BackgroundImage.scss";

const BackgroundImage = ({
  image,
  hexColor,
  filterOpacity,
}: {
  image: string;
  hexColor?: string;
  filterOpacity?: number;
}) => {
  return (
    <div className="background-image">
      <img src={image} alt="" />
      <div
        className="filter"
        style={{ backgroundColor: hexColor, opacity: filterOpacity ?? 1 }}
      ></div>
    </div>
  );
};

export default BackgroundImage;
