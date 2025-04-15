import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    role: {type: String, required: true},
    messages: {type: String, required: true},
    timestamps: {type: Date,default: new Date()}
});

export const Conversation = mongoose.model('Conversation', conversationSchema);