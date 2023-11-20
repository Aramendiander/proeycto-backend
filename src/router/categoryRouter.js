import { Router } from "express";

import productViewController from "../controllers/product/productViewController.js";
import {authWall,isAdmin} from "../middlewares/authMiddleware.js";

const router = Router();


router.get("/:category",(req,res)=>{
    productViewController.getByCategory(req,res);
});

router.get("/:category/json",(req,res)=>{
    productViewController.getByCategoryApi(req,res);
});


export default router