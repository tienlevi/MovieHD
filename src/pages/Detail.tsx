import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DetailMovie } from "../api/movie";
import MovieDetail from "../components/Movies/MovieDetail";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Embed from "../components/Movies/Embed";
import Comment from "../components/Comment/Comment";
import { MovieId } from "../interface/movie";
import useAuthStageChange from "../hooks/useAuthStageChange";
import {
  getComments,
  addComment,
  deleteComment,
  editComment,
  addFavoriteMovie,
  getFavoriteMovie,
} from "../config/action";
import User from "../interface/user";

function Detail() {
  const { id }: any = useParams();
  const [listComment, setListComment] = useState<User[]>([]);
  const [listFavorite, setListFavorite] = useState([]);
  const [detail, setDetail] = useState<MovieId>();
  const [exit, setExit] = useState<boolean>(false);
  const { user } = useAuthStageChange();

  const sortList = listComment.sort((a: any, b: any) => {
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
      const response: any = await getComments(id);
      setListComment(response);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getFavoriteMovie(user.uid);
      setListFavorite(response);
    };
    getData();
  }, [listFavorite]);

  const handleAdd = useCallback(
    async (data: any) => {
      try {
        const add = {
          id: id,
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          comment: data.comment,
          create_at: new Date().toLocaleString(),
        };
        await addComment(
          id,
          user?.uid,
          user?.displayName,
          user?.photoURL,
          data.comment
        );
        toast.success("Add success");
        setListComment((prev): any => {
          return [...prev, add];
        });
      } catch (error) {
        console.log(error);
      }
    },
    [listComment]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (confirm("Are sure want to delete ?")) {
        await deleteComment(id);
        const deleteItem = listComment.filter((item: User) => item.id !== id);
        setListComment(deleteItem);
        toast.error("Delete success");
      }
    },
    [listComment]
  );

  const handleEdit = async (data: any) => {
    await editComment(data.id, data.comment, data.update_at);
    const editItem = listComment.map((item: User) =>
      item.id === data.id ? data : item
    );
    toast.success("Edit success");
    setListComment(editItem);
  };

  const addFavorite = async (data: any) => {
    if (!user) return toast.error("You have to log in");
    if (listFavorite) {
      const movieExit = listFavorite.some(
        (item: any) => item.uid === user.uid && item.detailId === id
      );
      setExit(movieExit);

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
        style={{ width: "300px", height: "50px" }}
      />
      <Embed id={id} />
      {detail && <MovieDetail movie={detail} onAdd={addFavorite} />}
      <Comment
        listComment={sortList}
        id={id}
        uid={user?.uid}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <Footer />
    </>
  );
}

export default Detail;
