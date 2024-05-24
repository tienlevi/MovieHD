import Movies from "../components/Movies/Movies";
import Tv from "../components/TV/TV";
import Header from "../components/Header/Header";
import SlideShow from "../components/Banner/SlideShow";
import Title from "../components/Title/Title";
import Footer from "../components/Footer/Footer";
import Partner from "../components/Partner/Partner";

function Home() {
  return (
    <Title title="MovieHD - Watch Free Movies Online">
      <Header />
      <SlideShow />
      <Movies type="New Movies" typeHref="new" typeApi="now_playing" page={1} />
      <Movies
        type="Popular Movies"
        typeHref="popular"
        typeApi="top_rated"
        page={1}
      />
      <Tv page={1} />
      <Partner />
      <Footer />
    </Title>
  );
}

export default Home;
