import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DetailMovie } from "../api/movie";
import MovieDetail from "../components/Movies/MovieDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Embed from "../components/Movies/Embed";
import Comment from "../components/Comment/Comment";
import { MovieId } from "../interface";
import { getComments, postComment } from "../config/action";

function Detail() {
  const { id }: any = useParams();
  const [list, setList] = useState([]);
  const [comment, setComment] = useState<string>("");
  const [detail, setDetail] = useState<MovieId>();
  const user = JSON.parse(localStorage.getItem("User") as any);

  useEffect(() => {
    const getData = async () => {
      const response: any = await DetailMovie(id);
      setDetail(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response: any = await getComments(id);
        setList(response);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handlePost = async () => {
    try {
      await postComment(
        id,
        user?.uid,
        user?.displayName,
        user?.photoURL,
        comment
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      {/* <Embed id={id} /> */}
      {detail && <MovieDetail movie={detail} />}
      <Comment
        ListComment={list}
        uid={user?.uid}
        onPost={handlePost}
        setComment={setComment}
      />
      <Footer />
    </>
  );
}

export default Detail;
