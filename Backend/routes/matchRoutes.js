import express from "express";
import { findMatches } from "../controllers/matchControllers.js";

const matchRoute=express.Router()
matchRoute.get("/matches",findMatches)
export default matchRoute;