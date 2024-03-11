import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Country from "./pages/Country";
import Genre from "./pages/Genre";
import Search from "./pages/Search";
import ViewAll from "./pages/ViewAll";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/country" element={<Country />} />
        <Route path="/genre/:id" element={<Genre />} />
        <Route path="/search" element={<Search />} />
        <Route path="/view-all/:type" element={<ViewAll />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
