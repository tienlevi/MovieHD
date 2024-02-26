import dataUrl from "./axios";
import { ApiKey } from "../constants";
import { posterPath } from "../constants";

export const ImageMovie = (image: string) => {
  return `${posterPath}/${image}`;
};

export const newMovie = async () => {
  try {
    const response = dataUrl.get(
      `/movie/top_rated?api_key=${ApiKey}&language=en-US&page=1`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const DetailMovie = async () => {
  try {
    const response = dataUrl.get("/phim/fast-five");
    return response;
  } catch (err) {
    return err;
  }
};

export const getGenre = async () => {
  try {
    const response = dataUrl.get(
      `/genre/movie/list?api_key=${ApiKey}&language=en-US`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getCountry = async () => {
  try {
    const response = dataUrl.get(
      `/configuration/countries?api_key=${ApiKey}&language=en-US`
    );
    return response;
  } catch (err) {
    return err;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = dataUrl.get(
      `/movie/popular?api_key=${ApiKey}&language=en-US`
    );
    return response;
  } catch (err) {
    return err;
  }
};
