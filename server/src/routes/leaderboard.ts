import { Router } from "express";
import { getLeaderboard } from "../controllers/leaderboard.js";

const router = Router();

router.get("/leaderboard", getLeaderboard);

export { router };
