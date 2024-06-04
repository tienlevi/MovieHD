import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TvDetail from "../components/TV/TvDetail";
import { TvShowDetail } from "../interface/tv";
import { DetailTv } from "../api/tv";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EmbedTv from "../components/TV/EmbedTv";
import Season from "../components/TV/Season";
import Espisode from "../components/TV/Espisode";
import Comment from "../components/Comment/Comment";
import {
  getCommentTvShows,
  addCommentTvShow,
  deleteCommentTvShow,
  editCommentTvShow,
  addFavoriteMovie,
  getFavoriteMovie,
} from "../config/action";
import useAuthStageChange from "../hooks/useAuthStageChange";
import User from "../interface/user";

function DetailTvShow() {
  const { id }: any = useParams();
  const [list, setList] = useState<User[]>([]);
  const [listFavorite, setListFavorite] = useState([]);
  const [exit, setExit] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [detail, setDetail] = useState<TvShowDetail>();
  const paramSeason: any = searchParams.get("season") || "1";
  const paramEspisode: any = searchParams.get("episode") || 1;
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
      const response: any = await DetailTv(id);
      setDetail(response);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response: any = await getCommentTvShows(id);
        setList(response);
      } catch (error) {
        console.log(error);
      }
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

  const handleClickSeason = (query: string, season: string) => {
    searchParams.set("q", query);
    searchParams.set("season", season);
    searchParams.delete("episode");
    setSearchParams(searchParams);
    window.location.reload();
  };

  const handleClickEpisode = (season: string, episode: number) => {
    searchParams.set("season", season);
    searchParams.set("episode", episode.toString());
    setSearchParams(searchParams);
    window.location.reload();
  };

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
      await addCommentTvShow(
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
      const response = await deleteCommentTvShow(id);
      const deleteItem = list.filter((item: any) => item.id !== id);
      setList(deleteItem);
      toast.error("Delete success");
      return response;
    }
  }, []);

  const handleEdit = async (data: any) => {
    await editCommentTvShow(data.id, data.comment, data.update_at);
    const editItem = list.map((item: User) =>
      item.id === data.id ? data : item
    );
    toast.success("Edit success");
    setList(editItem);
  };

  const addFavorite = async (data: any) => {
    if (!user) return toast.error("You have to log in");
    const tvExit = listFavorite.some(
      (item: any) => item.uid === user.uid && item.detailId === id
    );
    setExit(tvExit);

    if (tvExit) {
      return toast.warning("Movie already exit");
    }
    await addFavoriteMovie(
      id,
      user.uid,
      data.original_name,
      data.poster_path,
      "tv"
    );
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
      <EmbedTv id={id} season={paramSeason} episode={paramEspisode} />
      {detail && <TvDetail tv={detail} onAdd={addFavorite} />}
      {detail && (
        <Season
          tv={detail}
          season={paramSeason}
          handleClick={handleClickSeason}
        />
      )}
      <Espisode id={id} season={paramSeason} handleClick={handleClickEpisode} />
      <Comment
        listComment={sortList}
        uid={user?.uid}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <Footer />
    </>
  );
}

export default DetailTvShow;
