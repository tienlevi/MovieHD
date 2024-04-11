import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TvDetail from "../components/TV/TvDetail";
import { TvShowDetail } from "../interface/tv";
import { DetailTv } from "../api/tv";
import Title from "../components/Title/Title";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EmbedTv from "../components/TV/EmbedTv";

function DetailTvShow() {
  const { id }: any = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [detail, setDetail] = useState<TvShowDetail>();
  const paramSeason: any = searchParams.get("season") || 1;
  const paramEspisode: any = searchParams.get("espisode") || 1;

  useEffect(() => {
    const getData = async () => {
      const response: any = await DetailTv(id);
      setDetail(response.data);
    };
    getData();
  }, []);
  return (
    <>
      <Header />
      <EmbedTv id={id} season={paramSeason} episode={paramEspisode} />
      {detail && <TvDetail tv={detail} />}
      <Footer />
    </>
  );
}

export default DetailTvShow;
