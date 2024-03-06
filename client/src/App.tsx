import { Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Country from "./pages/Country";
import Genre from "./pages/Genre";
import Search from "./pages/Search";
import ViewAll from "./pages/ViewAll";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/country" element={<Country />} />
      <Route path="/genre/:id" element={<Genre />} />
      <Route path="/search" element={<Search />} />
      <Route path="/view-all/:type" element={<ViewAll />} />
    </Routes>
  );
}

export default App;
