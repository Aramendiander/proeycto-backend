import jwt from "jsonwebtoken";
import adminModel from "../models/adminModel.js";


const isAuthenticated = (req,res,next) => 
{
    if(req.session.user){
        next();
    }
    else{
        res.redirect("/login");
    }
}

const isAdmin = async (req,res,next) =>{
    if(req.session.user !== "admin"){
            res.redirect("/admin/login");
    }
    else{
        next();
    }
}


export  {
    isAuthenticated,
    isAdmin
};