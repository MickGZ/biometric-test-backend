import pkg from "body-parser";
import express from "express";
import cors from "cors";
import http from "http";
import { userCredentials } from "./userDb.js";

const app = express();
const { json, urlencoded } = pkg;
app.set("port", process.env.PORT || 3080);

const server = http.createServer(app);

app.use(
  cors({
    origin: ["http://localhost:3080"],
  })
);

app.use(json({ limit: "50mb" }));
app.use(urlencoded({ extended: true, limit: "50mb" }));

app.get("/home", (req, res) => {
  res.send("The NOVA HOME is working");
});

app.post("/login", (req, res) => {
  if (
    req.body.usernameData === userCredentials.user &&
    req.body.passwordData === userCredentials.password
  ) {
    res.send({ ok: true, message: "All good!" });
  } else {
    res.send({ error: "User credentials are wrong", ok: false });
  }
});

app.post("/loginWithAuth", (req, res) => {
  const { auth } = req.body;
  if (auth) {
    res.send({ ok: true, message: "Auth success" });
  } else {
    req.send({ ok: false, error: "User credentials are wrong" });
  }
});

server.listen(app.get("port"), () => {
  console.log("The NOVA APP is running on port " + app.get("port"));
});
