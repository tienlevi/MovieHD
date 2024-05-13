import { useState, useEffect } from "react";
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
import { getCommentTvShows, addCommentTvShow } from "../config/action";
import useAuthStageChange from "../hooks/useAuthStageChange";

function DetailTvShow() {
  const { id }: any = useParams();
  const [list, setList] = useState<[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [detail, setDetail] = useState<TvShowDetail>();
  const [comment, setComment] = useState<string>("");
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
      {detail && <TvDetail tv={detail} />}
      {detail && (
        <Season
          tv={detail}
          season={paramSeason}
          handleClick={handleClickSeason}
        />
      )}
      <Espisode id={id} season={paramSeason} handleClick={handleClickEpisode} />
      <Comment ListComment={sortList} uid={user?.uid} onAdd={handleAdd} />
      <Footer />
    </>
  );
}

export default DetailTvShow;
