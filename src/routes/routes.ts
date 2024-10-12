import { Router } from "express";
import fakeAuthenticationRouter from "./fake-authentication/fake-authentication.router";
import vaultRouter from "./vault/vault.router";
import { authenticate } from "../middlewares/authentication.middleware";

const appRouter = Router();

appRouter.use("/vault", authenticate, vaultRouter);
appRouter.use("/fake-authentication", fakeAuthenticationRouter);

export default appRouter;
