import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Section from "../Section/Section";
import { EpisodeList } from "../../interface/tv";
import { getSeasonTv, ImageTv } from "../../api/tv";
import "./style.scss";

interface Props {
  id: number;
  season: number | string;
  handleClick: (season: any, espisode: any) => void;
}

function Espisode({ id, season, handleClick }: Props) {
  const [episodes, setEpisodes] = useState<EpisodeList[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: any = await getSeasonTv(id, season);
      setEpisodes(response.episodes);
    };
    getData();
  }, []);
  return (
    <Section className="episode">
      <div className="episode-content">
        {episodes.map((item: EpisodeList, index: number) => (
          <div
            onClick={() => handleClick(item.season_number, item.episode_number)}
            key={index}
            className="episode-content-children"
          >
            <div className="episode-content-img">
              <img src={ImageTv(item?.still_path)} alt="" />
              <div className="episode-content-play-icon">
                <PlayArrowRoundedIcon
                  style={{ fontSize: 35, color: "white" }}
                />
              </div>
              <div className="episode-content-language">
                Episode {item.episode_number}
              </div>
            </div>
            <div className="episode-content-title">
              <h2>{item?.name}</h2>
            </div>
            <p className="episode-content-time">{item.runtime}min</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Espisode;
