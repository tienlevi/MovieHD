import Movies from "../components/Movies/Movies";
import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import { newMovie } from "../api/movie";

function Home() {
  const [movie, setMovie] = useState<[]>([]);
  useEffect(() => {
    const API = async () => {
      const response: any = await newMovie();
      setMovie(response.data.results);
    };
    API();
  }, []);
  return (
    <div className="App">
      <Header />
      <Movies items={movie} />
    </div>
  );
}

export default Home;
