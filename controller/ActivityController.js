import { PrismaClient } from "@prisma/client";
import { getUser } from "./UserController.js";
const prisma = new PrismaClient();
let appearActivities = 5;

export const getIncomebyUser = async(req,res) => {
    const userId = req.params.id;
    try{
        const response = await prisma.Activities.findMany({
            where:{
                userId: Number(userId),
                primary: false,
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getOutcomebyUser = async(req,res) => {
    const userId = req.params.id;
    try{
        const response = await prisma.Activities.findMany({
            where:{
                userId: Number(userId),
                primary: true,
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({message:error.message});
    }   
}

export const getTotalIncomebyUser = async(req,res) => {
    const userId = req.params.id;

    try{
        const income = await prisma.Activities.findMany({
            where:{
                userId: Number(userId),
                primary: false,
            }
        });
    
        let totalIncome = 0;
        for(let  i = 0;i<income.length;i++){
            totalIncome += income[i].amount;
        }
    
        res.status(200).json({
            userId: userId,
            totalIncome: totalIncome
        });
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getTotalOutcomebyUser = async(req,res) => {
    const userId = req.params.id;

    try{
        const outcome = await prisma.Activities.findMany({
            where:{
                userId: Number(userId),
                primary: true,
            }
        });

        let totalOutcome = 0;
        for(let i = 0;i<outcome.length;i++){
            console.log(outcome[i].amount);
            totalOutcome += outcome[i].amount;
        }

        res.status(200).json({
            userId: userId,
            totalOutcome: totalOutcome
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const createIncomebyUser = async(req,res) => {
    const userId = req.params.id;
    const {amount,category,senderId} = req.body;
    try{
        const user = await prisma.User.findUnique({
            where: {
                id: Number(userId)
            }
        })
        
        const sender = await prisma.User.findUnique({
            where:{
                id: Number(senderId)
            }
        })
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(!sender){
            return res.status(404).json({message:"sender not found"});
        }
        
        const income = await prisma.Activities.create({
            data:{
                userId: Number(userId),
                amount: Number(amount),
                category: category,
                secondUserId: Number(senderId),
                primary: false,
            }
        });
        const outcome = await prisma.Activities.create({
            data:{
                userId: Number(senderId),
                amount: Number(amount),
                category: category,
                secondUserId: Number(userId),
                primary: true,
            }
        });
        
        const updatedUser = await prisma.User.update({
            where:{
                id: Number(req.params.id)
            },
            data:{
                name : user.name,
                Saldo: user.Saldo + amount
            }
        })
        
        const updatedSender = await prisma.User.update({
            where:{
                id: Number(senderId)
            },
            data:{
                name: sender.name,
                Saldo: sender.Saldo - amount
            }
        })
        const userFriend = await prisma.UserFriends.findUnique({
            where: {
                userFriendsId: {
                    friendsId: Number(userId),
                    friendsOfId: Number(senderId),
                },
            },
        });
        console.log(userFriend);
        if(userFriend){
            const updatedUserFriend = await prisma.UserFriends.update({
                where: {
                    userFriendsId: {
                        friendsId: Number(userId),
                        friendsOfId: Number(senderId),
                    },
                },
                data: {
                    exchange: userFriend.exchange + amount,
                },
            });
        }
        if(!userFriend){
            updatedUserFriend = await prisma.UserFriends.update({
                where:{
                    userFriendsId:{
                        friendsId: Number(senderId),
                        friendsOfId: Number(userId)

                    }
                },
                data:{
                    exchange: userFriend.exchange - amount
                }
            })
        }
        res.status(201).json(income);

    }catch(error){
        res.status(400).json({message: error.message});
    }
}

export const createOutcomebyUser = async(req,res) => {
    const userId = req.params.id;
    const {amount,category,recipientId} = req.body;
    try{
        const user = await prisma.User.findUnique({
            where:{
                id: Number(userId) 
            }
        })
        const recipient = await prisma.User.findUnique({
            where:{
                id: Number(recipientId)
            }
        })
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        if(!recipient){
            return res.status(404).json({message: "recipient not found"})
        }
        const outcome = await prisma.Activities.create({
            data:{
                userId: Number(userId),
                amount: Number(amount),
                category: category,
                secondUserId: Number(recipientId),
                primary: true, 
            }
        });
        const income = await prisma.Activities.create({
            data:{
                userId: Number(recipientId),
                amount: Number(amount),
                category: category,
                secondUserId: Number(userId),
                primary: false,  
            }
        })

        const updatedUser = await prisma.User.update({
            where: {
                id: Number(req.params.id)
            },
            data:{
                name: user.name,
                Saldo: user.Saldo - amount
            }
        })
        const updatedRecipient = await prisma.User.update({
            where: {
                id: Number(recipientId)
            },
            data:{
                name: recipient.name,
                Saldo: recipient.Saldo + amount
            }
        })

        const userFriend = await prisma.UserFriends.findUnique({
            where:{
                userFriendsId:{
                    friendsId: Number(userId),
                    friendsOfId: Number(recipientId),

                }
            }
        })
        if(userFriend){
            const updatedUserFriend = await prisma.UserFriends.update({
                where:{
                    userFriendsId:{
                        friendsId: Number(userId),
                        friendsOfId: Number(recipientId),

                    }
                },
                data:{
                    exchange: userFriend.exchange - amount
                }
            });
        }
        if(!userFriend){
            updatedUserFriend = await prisma.UserFriends.update({
                where:{
                    userFriendsId:{
                        friendsId: Number(recipientId),
                        friendsOfId: Number(userId)

                    }
                },
                data:{
                    exchange: userFriend.exchange + amount
                }
            })
        }

        res.status(201).json(outcome);

    }catch(error){
        res.status(400).json({message: error.message});
    }
}

// delete keknya masih salah
export const deleteIncome = async (req,res) => {
    try{
        const income = await prisma.Income.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })

        const user = await prisma.User.findUnique({
            where: {
                id: Number(income.userId)
            }
        })
        
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        
        const updatedUser = await prisma.user.update({
            where:{
                id: Number(user.id)
            },
            data:{
                Saldo: user.Saldo - income.amount,
            }
        })
        
        const deletedIncome = await prisma.Income.delete({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(deletedIncome);
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

export const deleteOutcome = async(req,res) => {
    try{
        const outcome = await prisma.Outcome.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })

        const user = await prisma.User.findUnique({
            where:{
                id: Number(outcome.userId)
            }
        })

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: Number(user.id)
            },
            data:{
                Saldo: user.Saldo + outcome.amount,
            }
        })

        const deleteOutcome = await prisma.Outcome.delete({
            where: {
                id: Number(req.params.id)
            }
        });
        res.status(200).json(deleteOutcome);

    }catch(error){
        res.status(400).json({message: error.message})
    }
}



export const getActivities = async (req,res) => {
    const userId = req.params.id;
    let data = [];
    try{
        const latest5Activities = await prisma.Activities.findMany({
            where:{
                userId: Number(userId),
            },
            
            orderBy:{
                createdAt: 'desc',
            },
            take: 5,
        })
        for(let i = 0;i<latest5Activities.length;i++){
            const secondUser = await getUser(latest5Activities[i].secondUserId);
            const amount = latest5Activities[i].amount;
            const category = latest5Activities[i].category;
            const primary = latest5Activities[i].primary;
            data.push({
                'secondUser': secondUser.name,
                'amount': amount,
                'category': category,
                'primary': primary,
            })
        }
        res.status(200).json(data);

    }catch(error){
        res.status(500).json({message:error.message});
    }
}