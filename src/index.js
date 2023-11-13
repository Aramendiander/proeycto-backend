import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import { isAuthenticated } from "./middlewares/authMiddleware.js";

import router from "./router/router.js";

dotenv.config();
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
        secure:false,
        maxAge: 1000 * 60 *20
    }
}))

app.use(express.static("public"));

app.set('views', './src/views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",isAuthenticated,(req,res)=>{
    res.render("home");
});

app.use("/",router);

app.listen(3008,()=>{
    console.log("servidor en marcha en el puerto 3008");
});