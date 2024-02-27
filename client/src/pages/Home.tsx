import { useState, useEffect } from "react";
import { getTopRateMovie } from "../api/movie";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import SlideShow from "../components/Banner/SlideShow";
import Title from "../components/Title/Title";
import Section from "../components/Section/Section";

function Home() {
  const [movie, setMovie] = useState<[]>([]);
  useEffect(() => {
    const getData = async () => {
      const response: any = await getTopRateMovie();
      setMovie(response.data.results);
    };
    getData();
  }, []);
  return (
    <Title title="MoPlay - Watch Free Movies Online">
      <Header />
      <SlideShow />
      <Movies items={movie} />
    </Title>
  );
}

export default Home;
