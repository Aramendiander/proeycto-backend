import { Router } from "express";

import productViewController from "../controllers/product/productViewController.js";
import {isAuthenticated,isAdmin} from "../middlewares/authMiddleware.js";

const router = Router();


router.get("/:id",isAuthenticated,(req,res)=>{
    cochesViewController.getById(req,res);
});

export default router