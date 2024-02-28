import { Routes, Route } from "react-router-dom";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Country from "./pages/Country";
import ViewAll from "./pages/ViewAll";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/country" element={<Country />} />
      <Route path="/view-all/:type" element={<ViewAll />} />
    </Routes>
  );
}

export default App;
