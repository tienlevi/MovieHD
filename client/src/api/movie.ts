import dataUrl from "./axios";
import { ApiKey } from "../constants";
import { posterPath } from "../constants";

export const ImageMovie = (image: string) => {
  return `${posterPath}/${image}`;
};

export const getMovies = async (type: string, page: number) => {
  try {
    const response = dataUrl.get(
      `/movie/${type}?api_key=${ApiKey}&language=en-US&page=${page}`
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

export const getGenres = async () => {
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

export const getCountryFilter = async (country: string) => {
  try {
    const response = dataUrl.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${ApiKey}&with_origin_country=${country}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getMovieByGenre = async (id: number, page: number) => {
  try {
    const response = dataUrl.get(
      `/discover/movie?api_key=${ApiKey}&with_genres=${id}&page=${page}`
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
