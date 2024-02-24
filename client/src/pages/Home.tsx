import { useState, useEffect } from "react";
import { newMovie } from "../api/movie";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import SlideShow from "../components/Banner/SlideShow";

function Home() {
  const [movie, setMovie] = useState<[]>([]);
  useEffect(() => {
    const API = async () => {
      const response: any = await newMovie();
      setMovie(response.data.results);
    };
    API();
  }, []);
  return (
    <>
      <Header />
      {/* <Movies items={movie} /> */}
      <SlideShow />
    </>
  );
}

export default Home;
