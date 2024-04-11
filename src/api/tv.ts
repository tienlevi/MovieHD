import dataUrl from "./axios";
import { ApiKey } from "../constants";

import { posterPath } from "../constants";

export const ImageTv = (image: string) => {
  return `${posterPath}/${image}`;
};

export const getTvShow = async (page: string | number) => {
  try {
    const response = await dataUrl.get(
      `/tv/top_rated?api_key=${ApiKey}&language=en-US&page=${page}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const DetailTv = async (id: string | number) => {
  try {
    const response = await dataUrl.get(`/tv/${id}?api_key=${ApiKey}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getSeasonTv = async (id: string | number, season: number) => {
  try {
    const response = await dataUrl.get(
      `/tv/${id}/season/${season}?api_key=${ApiKey}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
