import dataUrl from "./axios";
import { ApiKey } from "../constants";

import { posterPath } from "../constants";

export const ImageTv = (image: string) => {
  return `${posterPath}/${image}`;
};

export const getTvShow = async (page: string | number) => {
  try {
    const response = await dataUrl.get(
      `/tv/popular?api_key=${ApiKey}&language=en-US&page=${page}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
