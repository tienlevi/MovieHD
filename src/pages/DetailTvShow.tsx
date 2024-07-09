import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import TvDetail from "../components/TV/TvDetail";
import { TvShowDetail } from "../interface/tv";
import { DetailTv } from "../api/tv";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EmbedTv from "../components/TV/EmbedTv";
import Season from "../components/TV/Season";
import Espisode from "../components/TV/Espisode";
import Comment from "../components/Comment/Comment";
import { addFavoriteMovie, getFavoriteMovie } from "../config/action";
import useAuth from "../hooks/useAuth";
import CommentInterface from "../interface/comment";

function DetailTvShow() {
  const { id }: any = useParams();
  const [listFavorite, setListFavorite] = useState([]);
  const [exit, setExit] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [detail, setDetail] = useState<TvShowDetail>();
  const paramSeason: any = searchParams.get("season") || "1";
  const paramEspisode: any = searchParams.get("episode") || 1;
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const response: any = await DetailTv(id);
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

  const addFavorite = useCallback(
    async (data: any) => {
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
    },
    [listFavorite]
  );

  return (
    <>
      <Header />

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
      <Comment id={id} uid={user?.uid} type="tv" />
      <Footer />
    </>
  );
}

export default DetailTvShow;
