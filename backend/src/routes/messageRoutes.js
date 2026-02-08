import express from 'express';
import {protectedRoute} from '../middleware/authMiddleware.js'
import { getAllContacts, getMessageByID, sendMessage, getAllChats } from '../controllers/messageController.js';


const router = express.Router();
router.use(protectedRoute);
router.get('/contacts', getAllContacts)
router.get('/chats', getAllChats)
router.get('/:id', getMessageByID)
router.post('/send/:id', sendMessage)


export default router; 