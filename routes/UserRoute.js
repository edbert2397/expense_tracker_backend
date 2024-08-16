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


const router = express.Router();

router.get('/users',getUsers)
router.get('/usersFriends/:id',getUserFriendsById)
router.get('/users/:id',getUsersById)
router.get('/users/:email',getIdbyEmail)
router.post('/users',createUser)    
router.patch('/users/:id',updateUser)
router.delete('/users/:id',deleteUser)


export default router;
