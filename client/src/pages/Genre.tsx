import { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GenreFilter from "../components/Filter/GenreFilter";
import Title from "../components/Title/Title";
import Banner from "../components/Banner/Banner";
import Pagination from "../components/Pagination/Pagination";
import { getGenres } from "../api/movie";

function Genre() {
  const [genre, setGenre] = useState([]);
  const { id }: any = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const getParams = searchParams.get("page");
  const params = Number(getParams);

  const handleClickPage = useCallback((page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getGenres();
      setGenre(response.data.genres);
    };
    getData();
  }, []);

  const genreName: any = genre.find((item: any) => item.id === parseInt(id));

  return (
    <Title title="Genre">
      <Header />
      <Banner text={genreName.name} />
      <GenreFilter id={id} page={params || 1} />
      <Pagination
        currentPage={params || 1}
        maxPageLimit={100}
        clickPage={handleClickPage}
      />
      <Footer />
    </Title>
  );
}

export default Genre;
