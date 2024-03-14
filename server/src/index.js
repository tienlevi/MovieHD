import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

const port = 3000;

app.get("/proxy", async (req, res) => {
  try {
    const response = await axios.get(
      "https://moviehd-27efe.firebaseapp.com/__/auth/iframe",
      {
        headers: {
          "User-Agent": req.get("User-Agent"),
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

app.use(cors());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
