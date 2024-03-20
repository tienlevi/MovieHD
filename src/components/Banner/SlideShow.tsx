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
import { ImageMovie, getMovies, getGenres } from "../../api/movie";
import { MovieList, MovieGenre } from "../../interface";

function SlideShow() {
  const [topRateMovie, setTopRateMovie] = useState<MovieList[]>([]);
  const [genres, setGenres] = useState<MovieGenre[]>([]);
  const topRateMovieLength = topRateMovie.slice(0, 5);
  useEffect(() => {
    const getDataTopRateMovie = async () => {
      try {
        const response: any = await getMovies("now_playing", 1);
        setTopRateMovie(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getDataTopRateMovie();

    const getDataGenre = async () => {
      try {
        const response: any = await getGenres();
        setGenres(response.data.genres);
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

  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      pagination={pagination}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="slideshow"
    >
      {topRateMovieLength.map((item) => (
        <SwiperSlide className="slideshow-content" key={item.id}>
          <div className="slideshow-img">
            <img src={ImageMovie(item.backdrop_path)} alt="" />
          </div>
          <div className="slideshow-text">
            <h1 className="slideshow-text-title">{item.title}</h1>
            <div className="slideshow-text-other">
              <p className="slideshow-text-top-rate">
                <StarBorderRoundedIcon />
                <span>{item.vote_average}</span>
              </p>
              <p className="slideshow-text-release-date">{item.release_date}</p>
            </div>
            <p className="slideshow-text-genre">
              {genres
                .filter((genre) => item.genre_ids.includes(genre.id))
                .map((genre) => genre.name)
                .join(", ")}
            </p>
            <p className="slideshow-text-description">{item.overview}</p>
            <div className="slideshow-watch-detail">
              <Link to={`/detail/${item.id}`} className="slideshow-play-now">
                <PlayArrowRoundedIcon /> <span>Watch Now</span>
              </Link>
              <Link to={`/detail/${item.id}`} className="slideshow-detail">
                <span>Detail</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
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
