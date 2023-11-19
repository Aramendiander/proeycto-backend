import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../../models/userModel.js"
import cartModel from "../../models/cartModel.js"


const login = async(req,res) => {
    const {username,password} = req.body;
    try{
        const user = await userModel.findOne({where:{name:username}});
        if(!user){
            throw new Error("credenciales incorrectas");
        }
        const hash = user.password;

        if(await bcrypt.compare(password,hash)){
            req.session.user_id = user.id
            req.session.user_role = user.role;
            req.session.username = user.name;
        }    
    }
    catch(e){
        console.log(e)
        const errorUri = encodeURIComponent("credenciales incorrectas");
        return res.redirect("/login?error="+errorUri);
    }
    
    res.redirect("/");
}



const loginForm = (req,res) => {
    const errorMessage = req.query.error
    res.render("auth/login",{error:errorMessage});
}

const register = async(req,res) => {
    const {username,password,passwordConfirm} = req.body;
    if(!username || !password || !passwordConfirm){
        const errorUri = encodeURIComponent("Todos los campos son obligatorios");
        return res.redirect("/register?error=" + errorUri);
    }

    if(password !== passwordConfirm){
        const errorUri = encodeURIComponent("Las contraseñas no coinciden");
        return res.redirect("/register?error=" + errorUri);
    }

    try{
        const oldUser = await userModel.findOne({
            where:{
                name:username
            }
        });

        if(oldUser){
            const errorUri = encodeURIComponent("El usuario ya existe");
            return res.redirect("/register?error=" + errorUri);
        }
        const hash = await bcrypt.hash(password,10);
        const newUser = await userModel.create({
            name:username,
            password:hash,
            role:"user"
        });
        const newCart = await cartModel.create({
            active: 1,
            id_user: newUser.id,
        })
        req.session.user = newUser.name;
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
}

