import Message from '../models/Message.js';
import axios from 'axios';

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const sendMessage = async (req, res) => {
    const { sender, receiver, text } = req.body;

    const newMessage = new Message({ sender, receiver, text });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const randomAnswer = async (req, res) => {
    try {
        const response = await axios.get('https://api.adviceslip.com/advice');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}