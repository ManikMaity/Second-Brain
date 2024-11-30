import express from "express";
import { CLIENT_URL, PORT } from "./configs/server.config";
import userRouter from "./routes/user.route";
import contentRouter from "./routes/content.route";
import connetDB from "./configs/db.config";
import bodyParser from "body-parser";
import brainRouter from "./routes/barin.route";
import cors from "cors";

const app = express();
app.use(cors({
  origin : `${CLIENT_URL}`,
  credentials : true
}))
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    msg: "Server running successfully.",
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain", brainRouter);


(async () => {
  await connetDB();
  app.listen(PORT, () => {
    console.log(`Server started in http://localhost:${PORT}`);
  });
})();
