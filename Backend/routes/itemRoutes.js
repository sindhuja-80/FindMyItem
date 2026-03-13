import express from "express";
import upload from "../config/cloudinaryStorage.js";
import {addItem,getItems,getItemsByCategory,getItemsByTag,getItemById, getUserItems, deleteItem} from "../controllers/itemController.js";

const itemRouter = express.Router();

itemRouter.post("/add",upload.single("image"),addItem)
itemRouter.get("/", getItems);
itemRouter.get("/user/:userId",getUserItems)
itemRouter.get("/category/:category", getItemsByCategory);
itemRouter.get("/tag/:tag", getItemsByTag);
itemRouter.get("/:id", getItemById);
itemRouter.delete("/:id",deleteItem)

export default itemRouter;
