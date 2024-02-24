import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { imageSrc } from "../../constants";
import "./style.scss";

function SlideShow() {
  return (
    <Swiper className="slideshow">
      <SwiperSlide className="slideshow-content">
        <img src={imageSrc.banner} alt="" />
      </SwiperSlide>
      <SwiperSlide className="slideshow-content">
        <img src={imageSrc.banner} alt="" />
      </SwiperSlide>
      <SwiperSlide className="slideshow-content">
        <img src={imageSrc.banner} alt="" />
      </SwiperSlide>
    </Swiper>
  );
}

export default SlideShow;
