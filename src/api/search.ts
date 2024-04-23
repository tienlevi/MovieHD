import { ApiKey } from "../constants";
import dataUrl from "./axios";

export const searchQuery = async (query: string, page: number | string) => {
  try {
    const response = await dataUrl.get(
      `/search/multi?api_key=${ApiKey}&query=${query}&page=${page}`
    );

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
