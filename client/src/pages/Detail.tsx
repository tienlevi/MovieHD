import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailMovie } from "../api/movie";
import { MovieId } from "../types";
import MovieDetail from "../components/Movies/MovieDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import Embed from "../components/Movies/Embed";

function Detail() {
  const { id }: any = useParams();
  const [detail, setDetail] = useState<MovieId>();

  useEffect(() => {
    const getData = async () => {
      const response: any = await DetailMovie();
      setDetail(response.data);
      console.log(detail);
    };
    getData();
  }, []);
  return (
    <>
      <Header />
      <Embed />
      <MovieDetail />
    </>
  );
}

export default Detail;
