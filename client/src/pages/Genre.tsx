import { useState, useEffect, useCallback, CSSProperties } from "react";
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
import { MovieGenre } from "../types";
import { database } from "../config/firebase";

function Genre() {
  const [loading, setLoading] = useState<boolean>(true);
  const [genre, setGenre] = useState<MovieGenre[]>([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [pages, setPages] = useState<any>();
  const { id }: any = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const getParams = searchParams.get("page");
  const params = Number(getParams);
  const genreName: any = genre.find((item: any) => item.id === parseInt(id));

  const handleClickPage = useCallback((page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  }, []);

  const override: CSSProperties = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  // const movieCollectionRef = collection(database, "movies");
  // useEffect(() => {
  //   const getMovieLists = async () => {
  //     try {
  //       const response = await getDocs(movieCollectionRef);
  //       const filterData = response.docs.map((item) => item.data());
  //       console.log(filterData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getMovieLists();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getMovieByGenre(id, params || 1);
      setMovieByGenre(response.data.results);
      setPages(response.data.total_pages);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenres();
      setGenre(response.data.genres);
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
