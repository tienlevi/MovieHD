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

export const DetailMovie = async (id: number) => {
  try {
    const response = dataUrl.get(
      `/movie/${id}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos`
    );
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

export const searchMovie = (name: string, page: number) => {
  try {
    const response = dataUrl.get(
      `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${ApiKey}&page=${page}`
    );
    return response;
  } catch (error) {
    console.log(error);
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
