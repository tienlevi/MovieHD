import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import "swiper/css";
import "swiper/css/pagination";
import "./style.scss";
import { ImageMovie, getTopRateMovie, getGenre } from "../../api/movie";
import { MovieDetail, MovieGenre } from "../../types";

function SlideShow() {
  const [topRateMovie, setTopRateMovie] = useState<MovieDetail[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const topRateMovieLength = topRateMovie.slice(0, 5);
  useEffect(() => {
    const getDataTopRateMovie = async () => {
      try {
        const response: any = await getTopRateMovie();
        setTopRateMovie(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getDataTopRateMovie();

    const getDataGenre = async () => {
      try {
        const response: any = await getGenre();
        setGenres(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getDataGenre();
  }, []);

  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) => {
      return `<div class="swiper-pagination-button ${className}" key=${index}></div>`;
    },
    El: "swiper-pagination-button",
  };
  console.log(topRateMovieLength);

  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      pagination={pagination}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      loop
      // autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="slideshow"
    >
      {topRateMovieLength.map((item) => (
        <SwiperSlide className="slideshow-content" key={item.id}>
          <div className="slideshow-img">
            <img src={ImageMovie(item.poster_path)} alt="" />
          </div>
          <div className="slideshow-text">
            <h1 className="slideshow-text-title">{item.title}</h1>
            <div className="slideshow-text-other">
              <p className="slideshow-text-top-rate">
                <StarBorderRoundedIcon />
                <span>{item.adult}</span>
              </p>
              <p className="slideshow-text-year">{item.release_date}</p>
              <p className="slideshow-text-time">{item.adult}</p>
            </div>
            {/* {genres.map((genre) => ( */}
            <p className="slideshow-text-genre">
              {/* {item.genres.map((genre) => genre.name)} */}
            </p>
            {/* ))} */}

            <p className="slideshow-text-description">
              There are many variations of passages orem psum available but the
              majority have suffered alteration in some repeat predefined chunks
              form injected humour.
            </p>
            <div className="slideshow-watch-detail">
              <Link to="/" className="slideshow-play-now">
                <PlayArrowRoundedIcon /> <span>Watch Now</span>
              </Link>
              <Link to="/" className="slideshow-detail">
                <span>Detail</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
      {/* <SwiperSlide className="slideshow-content">
        <div className="slideshow-img">
          <img src={imageSrc.banner} alt="" />
        </div>
        <div className="slideshow-text">
          <h1 className="slideshow-text-title">
            Ant Man and the Wasp Quantaumania
          </h1>
          <div className="slideshow-text-other">
            <p className="slideshow-text-top-rate">
              <StarBorderRoundedIcon />
              <span>9.2</span>
            </p>
            <p className="slideshow-text-year">2023</p>
            <p className="slideshow-text-time">3h 15min</p>
          </div>
          <p className="slideshow-text-genre">Action</p>
          <p className="slideshow-text-description">
            There are many variations of passages orem psum available but the
            majority have suffered alteration in some repeat predefined chunks
            form injected humour.
          </p>
          <div className="slideshow-watch-detail">
            <Link to="/" className="slideshow-play-now">
              <PlayArrowRoundedIcon /> <span>Watch Now</span>
            </Link>
            <Link to="/" className="slideshow-detail">
              <span>Detail</span>
            </Link>
          </div>
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
            <p className="slideshow-text-top-rate">
              <StarBorderRoundedIcon />
              <span>9.2</span>
            </p>
            <p className="slideshow-text-year">2023</p>
            <p className="slideshow-text-time">3h 15min</p>
          </div>
          <p className="slideshow-text-genre">Action</p>

          <p className="slideshow-text-description">
            There are many variations of passages orem psum available but the
            majority have suffered alteration in some repeat predefined chunks
            form injected humour.
          </p>
          <div className="slideshow-watch-detail">
            <Link to="/" className="slideshow-play-now">
              <PlayArrowRoundedIcon /> <span>Watch Now</span>
            </Link>
            <Link to="/" className="slideshow-detail">
              <span>Detail</span>
            </Link>
          </div>
        </div>
      </SwiperSlide> */}
      <div className="swiper-button">
        <div className="swiper-button-next">
          <ArrowForwardIosRoundedIcon />
        </div>
        <div className="swiper-button-prev">
          <ArrowBackIosNewRoundedIcon />
        </div>
      </div>
    </Swiper>
  );
}

export default SlideShow;
