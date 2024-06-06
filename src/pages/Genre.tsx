import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GenreFilter from "../components/Filter/GenreFilter";
import Title from "../components/Title/Title";
import Banner from "../components/Banner/Banner";
import Pagination from "../components/Pagination/Pagination";
import { getMovieByGenre, getGenres } from "../api/movie";
import { MovieGenre } from "../interface/movie";

function Genre() {
  const [genre, setGenre] = useState<MovieGenre[]>([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [pages, setPages] = useState<any>();
  const { id }: any = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const params: any = parseInt(searchParams.get("page") as string);
  const genreName: any = genre.find((item: any) => item.id === Number(id));

  const handleClickPage = (page: number | string) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    window.location.reload();
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

  return (
    <Title title="Genre">
      <Header />
      <Banner text={genreName?.name} />
      <GenreFilter movies={movieByGenre} />
      <Pagination
        currentPage={params || 1}
        maxPageLimit={pages}
        clickPage={handleClickPage}
      />
      <Footer />
    </Title>
  );
}

export default Genre;
