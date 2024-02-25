import { useState, useEffect } from "react";
import { newMovie } from "../api/movie";
import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import SlideShow from "../components/Banner/SlideShow";
import Title from "../components/Title/Title";
import Section from "../components/Section/Section";

function Home() {
  const [movie, setMovie] = useState<[]>([]);
  useEffect(() => {
    const getData = async () => {
      const response: any = await newMovie();
      setMovie(response.data.results);
    };
    getData();
  }, []);
  return (
    <Title title="MoPlay - Watch Free Movies Online">
      <Header />
      {/* <Movies items={movie} /> */}
      <SlideShow />
      <Section className="">
        <div></div>
      </Section>
    </Title>
  );
}

export default Home;
