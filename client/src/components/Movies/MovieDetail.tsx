import { useEffect, useState } from "react";
import { DetailMovie, ImageMovie } from "../../api/movie";
import Section from "../Section/Section";
import "./style.scss";

function MovieDetail() {
  return (
    <Section className="container-detail">
      <div className="movie-detail">
        <img src="" alt="" />
      </div>
    </Section>
  );
}

export default MovieDetail;
