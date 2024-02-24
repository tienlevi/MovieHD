import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { imageSrc } from "../../constants";
import "./style.scss";

function SlideShow() {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      pagination={{ clickable: true }}
      navigation={true}
      loop
      className="slideshow"
    >
      <SwiperSlide className="slideshow-content">
        <div className="slideshow-img">
          <img src={imageSrc.banner} alt="" />
        </div>
        <div className="slideshow-text">
          <h1 className="slideshow-text-title">
            Ant Man and the Wasp Quantaumania
          </h1>
          <div className="slideshow-text-other">
            <p className="slideshow-text-top-rate">9.2</p>
            <p className="slideshow-text-year">2023</p>
            <p className="slideshow-text-time">3h 15min</p>
          </div>
          <p className="slideshow-text-description">
            There are many variations of passages orem psum available but the
            majority have suffered alteration in some repeat predefined chunks
            form injected humour.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="slideshow-content">
        <div className="slideshow-img">
          <img src={imageSrc.banner} alt="" />
        </div>
        <div className="slideshow-text">
          <h1 className="slideshow-text-title">
            Ant Man and the Wasp Quantaumania
          </h1>
          <div className="slideshow-text-other">
            <p className="slideshow-text-top-rate">9.2</p>
            <p className="slideshow-text-year">2023</p>
            <p className="slideshow-text-time">3h 15min</p>
          </div>
          <p className="slideshow-text-description">
            There are many variations of passages orem psum available but the
            majority have suffered alteration in some repeat predefined chunks
            form injected humour.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="slideshow-content">
        <div className="slideshow-img">
          <img src={imageSrc.banner} alt="" />
        </div>
        <div className="slideshow-text">
          <h1 className="slideshow-text-title">
            Ant Man and the Wasp Quantaumania
          </h1>
          <div className="slideshow-text-other">
            <p className="slideshow-text-top-rate">9.2</p>
            <p className="slideshow-text-year">2023</p>
            <p className="slideshow-text-time">3h 15min</p>
          </div>
          <p className="slideshow-text-description">
            There are many variations of passages orem psum available but the
            majority have suffered alteration in some repeat predefined chunks
            form injected humour.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default SlideShow;
