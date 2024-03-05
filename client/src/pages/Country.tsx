import { useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import CountryFilter from "../components/Filter/CountryFilter";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";
import Pagination from "../components/Pagination/Pagination";

function Country() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get("name");

  const handleSelect = (name: string) => {
    searchParams.set("name", name);
    setSearchParams(searchParams);
    window.location.reload();
  };

  return (
    <Title title="">
      <Header />
      <Banner text={params as string} />
      <CountryFilter name={params as string} handleSelect={handleSelect} />
      <Footer />
    </Title>
  );
}

export default Country;
