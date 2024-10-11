import express from "express";
import vaultRouter from "./vault/vault.router";
import fakeAuthenticationRouter from "./fake-authentication/fake-authentication.router";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/vault", vaultRouter);

app.use("/fake-authentication", fakeAuthenticationRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
