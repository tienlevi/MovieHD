import { useState, useEffect, CSSProperties } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import BounceLoader from "react-spinners/BounceLoader";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GenreFilter from "../components/Filter/GenreFilter";
import Title from "../components/Title/Title";
import Banner from "../components/Banner/Banner";
import Pagination from "../components/Pagination/Pagination";
import { getMovieByGenre, getGenres } from "../api/movie";
import { MovieGenre } from "../interface/movie";
import { db } from "../config/firebase";

function Genre() {
  const [loading, setLoading] = useState<boolean>(true);
  const [genre, setGenre] = useState<MovieGenre[]>([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [pages, setPages] = useState<any>();
  const { id }: any = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const params: any = searchParams.get("page") ?? 1;
  const genreName: any = genre.find((item: any) => item.id === Number(id));

  const handleClickPage = (page: number | string) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  };

  const override: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    const getData = async () => {
      const response: any = await getMovieByGenre(id, params || 1);
      setMovieByGenre(response.results);
      setPages(response.total_pages);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenres();
      setGenre(response.genres);
    };
    getData();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Title title="Genre">
      {loading ? (
        <BounceLoader
          color={"#29b6f6"}
          loading={loading}
          cssOverride={override}
          size={50}
        />
      ) : (
        <>
          <Header />
          <Banner text={genreName?.name} />
          <GenreFilter movies={movieByGenre} />
          <Pagination
            currentPage={params || 1}
            maxPageLimit={pages}
            clickPage={handleClickPage}
          />
          <Footer />
        </>
      )}
    </Title>
  );
}

export default Genre;
