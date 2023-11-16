import { Router } from "express";

import authRouter from "./authRouter.js";
import productRouter from "./productRouter.js";
import cartRouter from "./cartRouter.js";


const router = Router();

//router.use("/multas", multasRouter);


router.use("/",authRouter);

router.use("/product",productRouter);

router.use("/cart",cartRouter);

export default router;