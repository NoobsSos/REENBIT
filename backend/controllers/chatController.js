import Chat from "../models/Chat.js";

export const getChats = async (req, res) => {
    try {
        const chats = await Chat.find();
        res.status(200).json(chats);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createChat = async (req, res) => {
    const { firstName, lastName, user } = req.body;

    const newChat = new Chat({ firstName, lastName, createdBy: user });

    try {
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteChat = async (req, res) => {
    const { id } = req.params;

    try {
        await Chat.findByIdAndDelete(id);
        res.json({ message: "Chat deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateChat = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(id, { name }, { new: true });
        res.json(updatedChat);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}