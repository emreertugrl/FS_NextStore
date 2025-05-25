import express, { Router } from "express";
import AuthContoller from "./auth.controller.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router: Router = express.Router();

router.post("/register", AuthContoller.register);
router.post("/refresh", AuthContoller.refresh);
router.post("/login", AuthContoller.login);
router.post("/logout", AuthContoller.logout);
router.get("/me", authMiddleware, AuthContoller.me);
router.put("/updateme", authMiddleware, AuthContoller.updateMe);
router.get("/:id/favourites", authMiddleware, AuthContoller.getUserFavorites);
router.put("/favourites/:productId", authMiddleware, AuthContoller.addRemoveFavourites);

export default router;
