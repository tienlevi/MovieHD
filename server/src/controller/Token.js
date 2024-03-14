import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import admin from "../config/firebase.js";

dotenv.config();

function Token(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];
  const decodeValue = admin.auth().verifyIdToken(token);
  if (decodeValue) {
    req.user = decodeValue;
    return next();
  }
  if (!token) {
    res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

export default Token;
