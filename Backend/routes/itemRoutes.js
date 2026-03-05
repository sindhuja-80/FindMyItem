import express from 'express';
import upload from "../middleware/Upload.js"
import { addItem,getItems } from '../controllers/itemController';
const itemRouter=express.Router();

itemRouter.post("/add",upload.single("image"),addItem)

itemRouter.get("/",getItems)
export default itemRouter