import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { DetailMovie } from "../api/movie";
import MovieDetail from "../components/Movies/MovieDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Embed from "../components/Movies/Embed";
import Comment from "../components/Comment/Comment";
import { MovieId } from "../interface/movie";
import useAuth from "../hooks/useAuth";
import { addFavoriteMovie, getFavoriteMovie } from "../config/action";
import CommentInterface from "../interface/comment";

function Detail() {
  const { id }: any = useParams();
  const [listComment, setListComment] = useState<CommentInterface[]>([]);
  const [listFavorite, setListFavorite] = useState([]);
  const [detail, setDetail] = useState<MovieId>();
  const { user } = useAuth();

  const sortList = listComment?.sort((a: any, b: any) => {
    if (a.uid === user?.uid) {
      return -1;
    }
    if (b.uid === user?.uid) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    const getData = async () => {
      const response: any = await DetailMovie(id);
      setDetail(response);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getFavoriteMovie(user.uid);
      setListFavorite(response);
    };
    getData();
  }, [user]);

  const addFavorite = async (data: any) => {
    if (!user) return toast.error("You have to log in");
    if (listFavorite) {
      const movieExit = listFavorite.some(
        (item: any) => item.uid === user.uid && item.detailId === id
      );

      if (movieExit) {
        return toast.warning("Movie already exit");
      }
    }
    await addFavoriteMovie(id, user.uid, data.title, data.poster_path, "movie");
    toast.success("Add success");
  };

  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        theme="light"
        pauseOnHover={false}
        style={{
          width: "300px",
          height: "50px",
        }}
      />
      {/* <Embed id={id} /> */}
      {detail && <MovieDetail movie={detail} onAdd={addFavorite} />}
      <Comment id={id} uid={user?.uid} type={"movie"} />
      <Footer />
    </>
  );
}

export default Detail;
