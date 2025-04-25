import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    title: {type: String, require: true}
});

export const Categorie = mongoose.model('Categorie', categoriesSchema);