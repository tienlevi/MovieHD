import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import CountryFilter from "../components/Filter/CountryFilter";

function Country() {
  return (
    <div>
      <Header />
      <Banner text="Action" />
      <CountryFilter name="" />
    </div>
  );
}

export default Country;
