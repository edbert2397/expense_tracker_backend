import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const verifyUser = async (req,res,next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "mohon login"});
    }
    else{
        const user = await prisma.User.findUnique({
            where:{
                id: req.session.userId,
            }
        });
        if(!user){
            return res.status(404).json({msg:"user not found"});
        }
        req.userId = user.id;
        next();
    }
}