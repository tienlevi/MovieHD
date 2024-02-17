import dataUrl from "./axios";

const ApiKey = "bec721bcb126b9938b6c2f7b39448c63";

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

export const Genre = async () => {
  try {
    const response = dataUrl.get(
      `/genre/movie/list?api_key=${ApiKey}&language=en-US`
    );
    return response;
  } catch (err) {
    return err;
  }
};
