import { useState, useEffect } from "react";
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
import { getComments, addComment } from "../config/action";

function Detail() {
  const { id }: any = useParams();
  const [list, setList] = useState([]);
  const [comment, setComment] = useState<string>("");
  const [detail, setDetail] = useState<MovieId>();
  const user = JSON.parse(localStorage.getItem("User") as any);

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

  const handleAdd = async () => {
    try {
      const add = {
        id: id,
        uid: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        comment: comment,
        create_at: new Date().toLocaleString(),
      };
      await addComment(
        id,
        user?.uid,
        user?.displayName,
        user?.photoURL,
        comment
      );
      toast.success("Add success");
      setList((prev): any => {
        return [...prev, add];
      });
    } catch (error) {
      console.log(error);
    }
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
      {detail && <MovieDetail movie={detail} />}
      <Comment
        ListComment={sortList}
        uid={user?.uid}
        onAdd={handleAdd}
        setComment={setComment}
      />
      <Footer />
    </>
  );
}

export default Detail;
