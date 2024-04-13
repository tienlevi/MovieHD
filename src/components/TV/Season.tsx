import { TvShowDetail } from "../../interface/tv";
import Section from "../Section/Section";
import "./style.scss";

interface Props {
  tv: TvShowDetail;
  handleClick: (value: string) => void;
  paramName: string;
}

function Season({ tv, handleClick, paramName }: Props) {
  return (
    <Section className="">
      <div className="season">
        {tv.seasons.map((item: any, index: number) => (
          <p
            key={index}
            onClick={() => handleClick(item.name)}
            className={`season-children${item.name === paramName ? " season-children-active" : ""}`}
          >
            {item.name}
          </p>
        ))}
      </div>
    </Section>
  );
}

export default Season;
