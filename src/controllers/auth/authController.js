import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cochesModel from "../../models/cochesModel.js";
import adminModel from "../../models/adminModel.js";


const login = async(req,res) => {
    const {matricula,password} = req.body;
    try{
        const user = await cochesModel.findOne({where:{matricula:matricula}});
        if(!user){
            throw new Error("credenciales incorrectas");
        }
        const hash = user.password;

        if(await bcrypt.compare(password,hash)){
            req.session.id_coche = user.id_coche
            req.session.user = user.matricula;
        }    
    }
    catch(e){
        const errorUri = encodeURIComponent("credenciales incorrectas");
        return res.redirect("/login?error="+errorUri);
    }
    
    res.redirect("/");
}

const adminLogin = async(req,res) => {
    const {user,password} = req.body;
    try{
        const exist = await adminModel.findOne({where:{user:user}})
        if(!exist){
            throw new Error("credenciales incorrectas");
        }
        const hash = exist.password;

        if(await bcrypt.compare(password,hash)){
            req.session.user = exist.user;
        }    
    }
    catch(e){
        const errorUri = encodeURIComponent("credenciales incorrectas");
        return res.redirect("/admin/login?error="+errorUri);
    }
     
    res.redirect("/");
}

const loginForm = (req,res) => {
    const errorMessage = req.query.error
    res.render("auth/login",{error:errorMessage});
}

const adminLoginForm = (req,res) => {
    const errorMessage = req.query.error
    res.render("auth/adminLogin",{error:errorMessage});
}

const register = async(req,res) => {
    const {matricula,marca,modelo,password,passwordConfirm} = req.body;
    if(!matricula || !marca || !modelo || !password || !passwordConfirm){
        const errorUri = encodeURIComponent("Todos los campos son obligatorios");
        return res.redirect("/register?error=" + errorUri);
    }

    if(password !== passwordConfirm){
        const errorUri = encodeURIComponent("Las contraseñas no coinciden");
        return res.redirect("/register?error=" + errorUri);
    }

    try{
        const oldUser = await cochesModel.findOne({
            where:{
                matricula:matricula
            }
        });

        if(oldUser){
            console.log("oldUser:",oldUser);
            const errorUri = encodeURIComponent("El usuario ya existe");
            return res.redirect("/register?error=" + errorUri);
        }
        const hash = await bcrypt.hash(password,10);
        console.log(hash);
        const newUser = await cochesModel.create({
            matricula:matricula,
            marca:marca,
            modelo:modelo,
            password:hash
        });
        req.session.user = newUser.matricula;
        req.session.rol = newUser.rol;
        res.redirect("/login");
    }
    catch(e){
        const errorUri= encodeURIComponent(e.message);
        return res.redirect("/register?error=" + errorUri);
    }    
}

const registerForm = (req,res) => {
    const errorMessage = req.query.error;
    res.render("auth/register", {error:errorMessage});
}

const logout = (req,res)=>{
    req.session.destroy();
    res.redirect("/login");
}

export default{
    login,
    loginForm,
    logout,
    register,
    registerForm,
    adminLogin,
    adminLoginForm,
}

