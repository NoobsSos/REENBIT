import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;