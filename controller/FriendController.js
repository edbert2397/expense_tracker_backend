import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createFriendship = async (req,res) => {
    console.log("masuk friendship: ");
    const {idFriendA,idFriendB} = req.body;
    try{
        const Friendship = await prisma.UserFriends.create({
            data:{
                friendsId: idFriendA,
                friendsOfId:idFriendB
            }
        });
        res.status(201).json(Friendship);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}