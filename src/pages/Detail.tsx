import { useState, useEffect, useCallback } from "react";
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

function Detail() {
  const { id }: any = useParams();
  const [listFavorite, setListFavorite] = useState([]);
  const [exit, setExit] = useState<boolean>(false);
  const [detail, setDetail] = useState<MovieId>();
  const { user } = useAuth();

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

  const addFavorite = useCallback(
    async (data: any) => {
      if (!user) return toast.error("You have to log in");
      if (listFavorite) {
        const movieExit = listFavorite.some(
          (item: any) => item.uid === user.uid && item.detailId === id
        );
        setExit(movieExit);
        if (movieExit === true) {
          return toast.warning("Movie already exit");
        }
      }
      await addFavoriteMovie(
        id,
        user.uid,
        data.title,
        data.poster_path,
        "movie"
      );
      toast.success("Add success");
    },
    [listFavorite]
  );

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
      <Embed id={id} />
      {detail && <MovieDetail movie={detail} onAdd={addFavorite} />}
      <Comment id={id} uid={user?.uid} type={"movie"} />
      <Footer />
    </>
  );
}

export default Detail;
