import { Router } from "express";

import productViewController from "../controllers/product/productViewController.js";
import {authWall,isAdmin} from "../middlewares/authMiddleware.js";

const router = Router();


router.get("/:category",(req,res)=>{
    productViewController.getByCategory(req,res,1);
});


export default router