import express from "express";
import appRouter from "./routes/routes";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(appRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
