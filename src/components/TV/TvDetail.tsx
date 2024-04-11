import { useEffect } from "react";
import { ImageTv } from "../../api/tv";
import Section from "../Section/Section";
import { TvShowDetail } from "../../interface/tv";
import "./style.scss";

function TvDetail({ tv }: { tv: TvShowDetail }) {
  useEffect(() => {
    document.title = `Watch ${tv?.name}`;
  }, [document.title]);
  return (
    <Section className="container-detail">
      <div className="movie-detail">
        <div className="movie-detail-img">
          <img src={ImageTv(tv?.poster_path)} alt="" />
        </div>
        <div className="movie-detail-text">
          <div className="movie-detail-title">
            <h1>{tv?.name}</h1>
          </div>
          <div className="movie-detail-description">
            <p>{tv?.overview}</p>
          </div>
          <div className="movie-detail-info">
            <p>
              Genre:{" "}
              <span>
                {tv?.genres
                  .map((item: any) => {
                    return item.name;
                  })
                  .join(", ")}
              </span>
            </p>
            <p>
              Country: {""}
              <span>
                {tv?.production_countries
                  .map((country: any) => {
                    return country.name;
                  })
                  .join(", ")}
              </span>
            </p>
            <p>
              Release: <span>{tv?.first_air_date}</span>
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default TvDetail;
