import express from 'express';

import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

import { connectDB } from './db/connectDB.js';

import messageRouter from './routers/messageRouter.js';
import chatRouter from './routers/chatRouter.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

connectDB();

app.use('api/v1/messages', messageRouter);
app.use('api/v1/chats', chatRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

