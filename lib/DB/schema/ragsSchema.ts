import mongoose from "mongoose";

const ragsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String, required: true},
    rag:{type: String, required: true},
    category_id: {type: Number, required: true}
});

export const Rag = mongoose.model('Rag', ragsSchema);