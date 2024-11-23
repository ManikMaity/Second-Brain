import express from "express";
import { PORT } from "./configs/server.config";
import userRouter from "./routes/user.route";
import contentRouter from "./routes/content.route";
import connetDB from "./configs/db.config";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "Server running successfully.",
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter);


(async () => {
  await connetDB();
  app.listen(PORT, () => {
    console.log(`Server started in http://localhost:${PORT}`);
  });
})();
