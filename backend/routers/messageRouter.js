import express from 'express';

import { getMessages, sendMessage } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get('/', getMessages);
messageRouter.post('/', sendMessage);

export default messageRouter;
