import express from "express";
import cors from "cors";
import helmet from "helmet";
import compress from "compression";


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

export default app;
