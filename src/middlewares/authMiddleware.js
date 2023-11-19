import jwt from "jsonwebtoken";


const isAuthenticated = (req,res,next) => 
{
    if(req.session.user_id){
        res.locals.isAuthenticated = true;
        res.locals.username = req.session.username;
        next();
    }
    else{
        res.locals.isAuthenticated = false;
        next();
    }
}

const authWall = (req,res,next) => 
{
    if(req.session.user_id){
        next();
    }
    else{
        res.redirect("/login");
    }
}

const isAdmin = async (req,res,next) =>{
    if(req.session.role !== "admin"){
            res.redirect("/admin/login");
    }
    else{
        next();
    }
}


export  {
    isAuthenticated,
    authWall,
    isAdmin
};