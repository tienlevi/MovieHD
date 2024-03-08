import { useEffect, useState } from "react";
import { DetailMovie } from "../../api/movie";
import { MovieId } from "../../types";
import Section from "../Section/Section";
import "./style.scss";

function Embed() {
  const [video, setVideo] = useState<MovieId>();

  useEffect(() => {
    const getData = async () => {
      const response: any = await DetailMovie();
      setVideo(response.data);
      console.log(response);
    };
    getData();
  }, []);

  return (
    <Section className="container-embed">
      <iframe
        src={`https://www.2embed.cc/embed/${video?.id}`}
        width={"100%"}
        height={"550px"}
      ></iframe>
    </Section>
  );
}

export default Embed;
