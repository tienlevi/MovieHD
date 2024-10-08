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
import { Profile } from "./pages/Profile";
import ProtectRoute from "./authentication/ProtectRoute";
import TvShow from "./pages/TvShow";
import DetailTvShow from "./pages/DetailTvShow";
import AppContext from "./context/AppContext";
import "./styles/themeMode.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <AppContext>
        <ScrollToTop />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          newestOnTop={false}
          theme="light"
          pauseOnHover={false}
          style={{ width: "300px", height: "50px" }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/country" element={<Country />} />
          <Route path="/genre/:id" element={<Genre />} />
          <Route path="/search" element={<Search />} />
          <Route path="/view-all/:type" element={<ViewAll />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route element={<ProtectRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/tv-show" element={<TvShow />} />
          <Route path="/detail-tv-show/:id" element={<DetailTvShow />} />
        </Routes>
      </AppContext>
    </>
  );
}

export default App;
