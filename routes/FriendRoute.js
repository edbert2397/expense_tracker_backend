import express from 'express';
import{
    createFriendship
} from "../controller/FriendController.js";

const router = express.Router();

router.post('/createFriendship',createFriendship)

export default router;