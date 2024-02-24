import { imageSrc } from "../../constants";
import "./style.scss";

function Banner({ text }: { text: string }) {
  return (
    <div className="banner">
      <div className="banner-img">
        <img src={imageSrc.banner} alt="" />
      </div>
      <div className="banner-text">
        <h1>{text} Movies</h1>
      </div>
    </div>
  );
}

export default Banner;
