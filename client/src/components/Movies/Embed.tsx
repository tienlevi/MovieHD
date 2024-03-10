import { useEffect, useState } from "react";
import { DetailMovie } from "../../api/movie";
import { MovieId } from "../../types";
import Section from "../Section/Section";
import "./variabales.scss";

function Embed({ id }: any) {
  return (
    <Section className="container-embed">
      <iframe
        src={`https://www.2embed.cc/embed/${id}`}
        width={"100%"}
        height={"550px"}
      ></iframe>
    </Section>
  );
}

export default Embed;
