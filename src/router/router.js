import { Router } from "express";

import authRouter from "./authRouter.js";
import productRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js";

const router = Router();


router.use("/",authRouter);

router.use("/product",productRouter);

router.use("/cart",cartRouter);

router.get("/thanks", (req,res) =>{
    res.render("cart/thanks")
});

export default router;