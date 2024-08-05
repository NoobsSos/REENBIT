import express from 'express';

import { getMessages, sendMessage, randomAnswer } from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get('/', getMessages);
messageRouter.get('/random', randomAnswer);
messageRouter.post('/', sendMessage);


export default messageRouter;
