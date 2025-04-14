import mongoose from "mongoose";

const modelsSchema = new mongoose.Schema({
    modelname: {
        type: String,
        required: true,
    },
    
});

export const Model = mongoose.model('Model', modelsSchema);