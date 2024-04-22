import Section from "../Section/Section";
import "./style.scss";

function Embed({ id }: any) {
  return (
    <Section className="container-embed">
      <iframe
        src={`https://www.2embed.cc/embed/${id}`}
        width={"100%"}
        height={"550px"}
        allowFullScreen
      ></iframe>
    </Section>
  );
}

export default Embed;
