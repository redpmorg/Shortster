import express from "express";
import cors from "cors";
import helmet from "helmet";
import compress from "compression";

import * as actions from "./actions/urls.js";
import { makeHandlerAwareOfAsyncErrors } from "./utils/tools.js";

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", express.static("public"));

app.post("/submit", makeHandlerAwareOfAsyncErrors(actions.create));

app.get("/:url?", makeHandlerAwareOfAsyncErrors(actions.getByShortUrlThenRedirect));

app.get("/:url?/stats", makeHandlerAwareOfAsyncErrors(actions.getByShortUrl));

export default app;
