import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import CountryFilter from "../components/Filter/CountryFilter";
import Footer from "../components/Footer/Footer";

function Country() {
  return (
    <div>
      <Header />
      <Banner text="Action" />
      <CountryFilter name="" />
      <Footer />
    </div>
  );
}

export default Country;
