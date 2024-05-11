import { TvShowDetail } from "../../interface/tv";
import Section from "../Section/Section";
import "./style.scss";

interface Props {
  tv: TvShowDetail;
  handleClick: (query: string, season: string) => void;
  season: string | number;
}

function Season({ tv, handleClick, season }: Props) {
  console.log(season);

  return (
    <Section className="">
      <div className="season">
        {tv.seasons.map((item: any, index: number) => (
          <div
            onClick={() => handleClick(item.name, item.season_number)}
            key={index}
            className={`season-children${item.season_number.toString() === season ? " season-children-active" : ""}`}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Season;
