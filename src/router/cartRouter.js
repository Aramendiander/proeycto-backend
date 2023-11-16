import { Router } from "express";

import {isAuthenticated,isAdmin} from "../middlewares/authMiddleware.js";
import cartViewController from "../controllers/cart/cartViewController.js";

const router = Router();


router.get("/", isAuthenticated, (req,res)=>{
    cartViewController.getCart(req,res);
})

router.post("/addToCart", isAuthenticated, (req,res)=>{
    cartViewController.addToCart(req,res);
});

export default router