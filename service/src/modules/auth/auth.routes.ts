import express, { Router } from "express";
import AuthContoller from "./auth.controller.ts";

const router: Router = express.Router();

router.post("/register", AuthContoller.register);
router.post("/refresh", AuthContoller.refresh);
router.post("/login", AuthContoller.login);
router.post("/logout", AuthContoller.logout);

export default router;
