import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import CountryFilter from "../components/Filter/CountryFilter";
import Footer from "../components/Footer/Footer";
import Title from "../components/Title/Title";

function Country() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramName: any = searchParams.get("name");
  const paramId: any = searchParams.get("id");

  const handleSelect = useCallback((id: string, name: string) => {
    searchParams.set("name", name);
    searchParams.set("id", id);
    setSearchParams(searchParams);
    window.location.reload();
  }, []);

  return (
    <Title title={`${paramName ? paramName : "Country"} Movie`}>
      <Header />
      <Banner text={paramName} />
      <CountryFilter
        id={paramId}
        name={paramName}
        handleSelect={handleSelect}
      />
      <Footer />
    </Title>
  );
}

export default Country;
