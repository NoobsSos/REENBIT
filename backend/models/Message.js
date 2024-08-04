import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
    },

    receiver: {
        type: String,
    },

    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;