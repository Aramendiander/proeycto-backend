import { Router } from "express";

import {authWall,isAdmin} from "../middlewares/authMiddleware.js";
import cartViewController from "../controllers/cart/cartViewController.js";

const router = Router();


router.get("/", authWall, (req,res)=>{
    cartViewController.getCart(req,res);
})

router.post("/addToCart", authWall, (req,res)=>{
    cartViewController.addToCart(req,res);
});

router.post("/purchase", authWall, (req,res)=>{
    cartViewController.purchase(req,res);
});

router.get("/history", authWall, (req,res)=>{
    cartViewController.cartHistory(req,res);
})

router.get("/history/:id",(req,res)=>{
    cartViewController.getCartById(req,res);
})

router.post("/remove/:id",(req,res)=>{
    cartViewController.removeItemFromCart(req,res);
})

export default router