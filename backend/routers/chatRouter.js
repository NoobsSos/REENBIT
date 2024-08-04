import express from 'express';

import { getChats, createChat, deleteChat } from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.get('/', getChats);
chatRouter.post('/', createChat);
chatRouter.delete('/:id', deleteChat);

export default chatRouter;