import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailMovie } from "../api/movie";
import MovieDetail from "../components/Movies/MovieDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import Embed from "../components/Movies/Embed";

function Detail() {
  const { id }: any = useParams();
  const [detail, setDetail] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const response: any = await DetailMovie(id);
      setDetail(response.data);
    };
    getData();
  }, []);
  return (
    <>
      <Header />
      <Embed id={id} />
      <MovieDetail movie={detail} />
    </>
  );
}

export default Detail;
