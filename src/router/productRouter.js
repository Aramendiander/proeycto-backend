import { Router } from "express";

import productViewController from "../controllers/product/productViewController.js";
import {isAuthenticated,isAdmin} from "../middlewares/authMiddleware.js";

const router = Router();


router.get("/:title",(req,res)=>{
    productViewController.getByTitle(req,res);
});

export default router