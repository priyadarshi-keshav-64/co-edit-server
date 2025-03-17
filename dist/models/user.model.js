"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userId: String,
    name: String,
    email: String,
    firstName: String,
    lastName: String,
    image: String,
    lastSignedInAt: Date
}, {
    timestamps: true
});
const User = (0, mongoose_1.model)('user', UserSchema);
exports.default = User;
