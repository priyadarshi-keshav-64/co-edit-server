import { Schema, model } from "mongoose";

const DocumentSchema = new Schema({
    _id: String,
    name: String,
    content: Object,
}, {
    timestamps: true
})

const Document = model('documents', DocumentSchema);

export default Document;