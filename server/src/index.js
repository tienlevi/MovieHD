import express from "express";
import axios from "axios";
import cors from "cors";
import router from "./routers/router.js";

const app = express();

const port = 3000;

app.use(cors());
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
