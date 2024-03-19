import axios from "axios";

const dataUrl = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});

export default dataUrl;
