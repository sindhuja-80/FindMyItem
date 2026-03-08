import express from "express";
import upload from "../middleware/upload.js";
import {addItem,getItems,getItemsByCategory,getItemsByTag,getItemById} from "../controllers/itemController.js";

const itemRouter = express.Router();


itemRouter.post("/add", upload.single("image"), addItem);
itemRouter.get("/", getItems);
itemRouter.get("/category/:category", getItemsByCategory);
itemRouter.get("/tag/:tag", getItemsByTag);
itemRouter.get("/:id", getItemById);

export default itemRouter;
