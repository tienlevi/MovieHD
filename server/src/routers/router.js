import express from "express";
import Token from "../controller/Token.js";
import { AccessToken } from "../controller/Auth.js";

const router = express.Router();

router.get("/list", (req, res) => {
  return res.json({ title: "Maze runner" });
});

router.get("/user", Token, AccessToken);

export default router;
