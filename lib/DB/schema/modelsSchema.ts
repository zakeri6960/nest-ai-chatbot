import mongoose from "mongoose";

const modelsSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    model: {type: String, required: true},
    parameter_size: {type: String, required: true},
    active: {type: Boolean, required: true, default: false}
    
});

export const Model = mongoose.model('Model', modelsSchema);