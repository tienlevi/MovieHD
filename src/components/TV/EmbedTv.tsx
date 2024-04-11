import Section from "../Section/Section";

interface Props {
  id: string;
  season: string | number;
  episode: string | number;
}

function EmbedTv({ id, season, episode }: Props) {
  return (
    <div>
      <Section className="container-embed">
        <iframe
          src={`https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`}
          width={"100%"}
          height={"550px"}
        ></iframe>
      </Section>
    </div>
  );
}

export default EmbedTv;
