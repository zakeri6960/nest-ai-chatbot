import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    user: {type: String, required: true},
    messages: [
        {
        text: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
        sender: {
            type: String,
            required: true,
        },
        },
    ],
});

export const Conversation = mongoose.model('Conversation', conversationSchema);