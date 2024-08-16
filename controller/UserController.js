import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getUser = async (id) =>{
    try{
        const user = await prisma.User.findUnique({
            where:{
                id: Number(id)
            }
        });
        if(user){
            return user;
        }
    }
    catch(error){
        throw new Error(`failed to fetch user ${id}`)
    }
 }

export const getUsers = async(req,res) => {
    try{
        const response = await prisma.User.findMany();
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
export const getIdbyEmail = async(req,res) => {
    try{
        const user = await prisma.User.findUnique({
            where: {
                email: req.params.email
            },
            select:{
                id: true
            }
        });
        if(user){
            res.status(200).json({id: user.id})
        }
        else{
            res.status(404).json({message: "User not found"})
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
export const getUsersById = async(req,res) => {
    try{
        const response = await prisma.User.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({message: error.message});
    }

}
export const getUserFriendsById = async(req,res) => {
    try{
        const response1 = await prisma.userFriends.findMany({
            where:{
                friendsId: Number(req.params.id)
            },
        });
        const response2 = await prisma.userFriends.findMany({
            where:{
                friendsOfId: Number(req.params.id)
            },
        });
        for(let i = 0;i<response1.length;i++){
            const user = await getUser(response1[i].friendsOfId);
            response1[i] = {
                userId: response1[i].friendsOfId,
                name: user.name,
                exchange: response1[i].exchange
            };
        }
        for(let i = 0;i<response2.length;i++){
            const user = await getUser(response2[i].friendsId);
            response2[i] = {
                userId: response2[i].friendsId,
                name: user.name,
                exchange: response2[i].exchange
            };
        }
        const response = response1.concat(response2);
        console.log(response);
        res.status(200).json(response);
    }catch(error){
        res.status(404).json({message: error.message});
    }

}
export const createUser = async (req,res) => {
    // id 1 : edbert
    // id 2 : richard
    // id 3: michael
    const {name,saldo,email,password} = req.body;
    try{
        const user = await prisma.User.create({
            data:{
                name: name,
                Saldo: saldo,
                email: email,
                password: password,
            }
        });
        res.status(201).json(user);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}

export const updateUser = async (req,res) => {
    const {name,saldo} = req.body;
    try{
        const user = await prisma.User.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                name: name,
                Saldo: saldo
            }
        });
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message:error.message});
    }
}
export const deleteUser = async (req,res) => {
    try{
        const user = await prisma.User.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(user);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}
