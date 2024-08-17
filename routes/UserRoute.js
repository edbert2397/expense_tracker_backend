import express from "express";
import {
    getUsers,
    getUsersById,
    createUser,
    updateUser, 
    deleteUser,
    getIdbyEmail,
    getUserFriendsById
 } from "../controller/UserController.js";

import {verifyUser} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users',getUsers)
router.get('/usersFriends/:id',verifyUser, getUserFriendsById)
router.get('/users/:id',verifyUser, getUsersById)
router.get('/users/:email',verifyUser, getIdbyEmail)
router.post('/users',createUser)    
router.patch('/users/:id',updateUser)
router.delete('/users/:id',deleteUser)


export default router;
