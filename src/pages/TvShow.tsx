import { useState, useEffect } from "react";
import TV from "../components/TV/TV";
import Title from "../components/Title/Title";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function TvShow() {
  return (
    <Title title="TV Show">
      <Header />
      <div className="view-all" style={{ marginTop: 100 }}>
        <TV page={1} />
      </div>
      <Footer />
    </Title>
  );
}

export default TvShow;
