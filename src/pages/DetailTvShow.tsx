import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TvDetail from "../components/TV/TvDetail";
import { EpisodeList, TvShowDetail } from "../interface/tv";
import { DetailTv, getSeasonTv } from "../api/tv";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EmbedTv from "../components/TV/EmbedTv";
import Season from "../components/TV/Season";
import Espisode from "../components/TV/Espisode";

function DetailTvShow() {
  const { id }: any = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [detail, setDetail] = useState<TvShowDetail>();
  const paramSeason: any = searchParams.get("season") || "1";
  const paramEspisode: any = searchParams.get("episode") || 1;

  useEffect(() => {
    const getData = async () => {
      const response: any = await DetailTv(id);
      setDetail(response);
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
  return (
    <>
      <Header />
      {/* <EmbedTv id={id} season={paramSeason} episode={paramEspisode} /> */}
      {detail && <TvDetail tv={detail} />}
      {detail && (
        <Season
          tv={detail}
          season={paramSeason}
          handleClick={handleClickSeason}
        />
      )}
      <Espisode id={id} season={paramSeason} handleClick={handleClickEpisode} />
      <Footer />
    </>
  );
}

export default DetailTvShow;
