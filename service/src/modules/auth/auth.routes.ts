import express, { Router } from "express";
import AuthContoller from "./auth.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router: Router = express.Router();

router.post("/register", AuthContoller.register);
router.post("/refresh", AuthContoller.refresh);
router.post("/login", AuthContoller.login);
router.post("/logout", AuthContoller.logout);
router.post("/me", authMiddleware, AuthContoller.me);

export default router;
