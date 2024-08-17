import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Login = async (req,res) => {
    const {email,password} = req.body;
    const user = await prisma.User.findUnique({
        where:{
            email:email,
        }
    });
    if(!user){
        return res.status(404).json({msg:"no user found"});
    }
    else{
        if(password == user.password) {
            req.session.userId = user.id;

            const userId = user.id;
            const name = user.name;
            const email = user.email;

            return res.status(200).json({userId,name,email});
        }
        else{
            return res.status(400).json({msg: "wrong password"});
        }
    }
}

export const Me = async (req,res) => {
    if(!req.session.userId){
        res.status(401).json({msg: "mohon login"});
    }
    else{
        const user = prisma.User.findUnique({
            select:{
                id: true,
                name: true,
                email: true,
            },
            where:{
                id: req.session.userId,
            }
        });
        if(!user){
            return res.status(404).json({msg: "no user found"});
        }
        else{
            return res.status(200).json(user);
        }
    }
}

export const Logout  = async (req,res) =>{
    req.session.destroy((err) => {
        if(err){
            return res.status(400).json({msg:"can not logout"});
        }
        else{
            return res.status(200).json({msg: "logout success"})
        }
    });
}