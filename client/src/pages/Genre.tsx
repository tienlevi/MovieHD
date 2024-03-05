import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GenreFilter from "../components/Filter/GenreFilter";
import Title from "../components/Title/Title";
import Banner from "../components/Banner/Banner";

function Genre() {
  return (
    <Title title="genre">
      <Header />
      <Banner text="" />
      <GenreFilter />
      <Footer />
    </Title>
  );
}

export default Genre;
