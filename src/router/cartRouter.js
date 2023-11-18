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

router.post("/purchase", isAuthenticated, (req,res)=>{
    cartViewController.purchase(req,res);
});

router.get("/history", isAuthenticated, (req,res)=>{
    cartViewController.cartHistory(req,res);
})

router.get("/history/:id",(req,res)=>{
    cartViewController.getCartById(req,res);
})

router.post("/remove/:id",(req,res)=>{
    cartViewController.removeItemFromCart(req,res);
})

export default router