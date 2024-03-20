import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailMovie } from "../api/movie";
import MovieDetail from "../components/Movies/MovieDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Embed from "../components/Movies/Embed";
import Comment from "../components/Comment/Comment";
import { MovieId } from "../interface";

function Detail() {
  const { id }: any = useParams();
  const [detail, setDetail] = useState<MovieId>();

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
      {detail && <MovieDetail movie={detail} />}
      <Comment />
      <Footer />
    </>
  );
}

export default Detail;
