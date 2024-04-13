import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TvDetail from "../components/TV/TvDetail";
import { TvShowDetail } from "../interface/tv";
import { DetailTv } from "../api/tv";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EmbedTv from "../components/TV/EmbedTv";
import Season from "../components/TV/Season";

function DetailTvShow() {
  const { id }: any = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [detail, setDetail] = useState<TvShowDetail>();
  const paramName: any = searchParams.get("name-season");
  const paramSeason: any = searchParams.get("season") || 1;
  const paramEspisode: any = searchParams.get("espisode") || 1;

  useEffect(() => {
    const getData = async () => {
      const response: any = await DetailTv(id);
      setDetail(response.data);
    };
    getData();
  }, []);

  const handleClickSeason = (season: string) => {
    searchParams.set("name-season", season);
    setSearchParams(searchParams);
  };
  return (
    <>
      <Header />
      <EmbedTv id={id} season={paramSeason} episode={paramEspisode} />
      {detail && <TvDetail tv={detail} />}
      {detail && (
        <Season
          tv={detail}
          paramName={paramName}
          handleClick={handleClickSeason}
        />
      )}
      <Footer />
    </>
  );
}

export default DetailTvShow;
