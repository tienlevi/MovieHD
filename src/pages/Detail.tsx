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
import { getComments, addComment, deleteComment } from "../config/action";
import useAuthStageChange from "../hooks/useAuthStageChange";

function Detail() {
  const { id }: any = useParams();
  const [list, setList] = useState([]);
  const [detail, setDetail] = useState<MovieId>();
  const { user } = useAuthStageChange();

  const sortList = list.sort((a: any, b: any) => {
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
      try {
        const response: any = await getComments(id);
        setList(response);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleAdd = async (data: any) => {
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
      setList((prev): any => {
        return [...prev, add];
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = useCallback(async (id: string) => {
    if (confirm("Are sure want to delete ?")) {
      await deleteComment(id);
      const deleteItem = list.filter((item: any) => item.id !== id);
      setList(deleteItem);
      toast.error("Delete success");
    }
  }, []);

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
      {detail && <MovieDetail movie={detail} />}
      <Comment
        listComment={sortList}
        uid={user?.uid}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
      <Footer />
    </>
  );
}

export default Detail;
