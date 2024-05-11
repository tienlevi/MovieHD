import dataUrl from "./axios";
import { ApiKey } from "../constants";
import { posterPath } from "../constants";

export const ImageMovie = (image: string) => {
  return `${posterPath}/${image}`;
};

export const getMovies = async (type: string, page: number | string) => {
  try {
    const response = await dataUrl.get(
      `/movie/${type}?api_key=${ApiKey}&language=en-US&page=${page}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const DetailMovie = async (id: number | string) => {
  try {
    const response = await dataUrl.get(
      `/movie/${id}?api_key=${ApiKey}&append_to_response=videos`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getGenres = async () => {
  try {
    const response = await dataUrl.get(
      `/genre/movie/list?api_key=${ApiKey}&language=en-US`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getCountry = async () => {
  try {
    const response = await dataUrl.get(
      `/configuration/countries?api_key=${ApiKey}&language=en-US`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getCountryFilter = async (
  country: string,
  page: number | string
) => {
  try {
    const response = await dataUrl.get(
      `/discover/movie?api_key=${ApiKey}&with_origin_country=${country}&page=${page}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getMovieByGenre = async (
  id: number | string,
  page: number | string
) => {
  try {
    const response = await dataUrl.get(
      `/discover/movie?api_key=${ApiKey}&with_genres=${id}&page=${page}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await dataUrl.get(
      `/movie/popular?api_key=${ApiKey}&language=en-US`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
