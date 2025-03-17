"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DocumentSchema = new mongoose_1.Schema({
    _id: String,
    name: String,
    content: Object,
}, {
    timestamps: true
});
const Document = (0, mongoose_1.model)('documents', DocumentSchema);
exports.default = Document;
