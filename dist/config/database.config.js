"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, mongoose_1.connect)(process.env.DATABASE ? process.env.DATABASE : "");
        console.log(`MongoDB Connected ${connection.connection.host}`);
    }
    catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
});
exports.default = connectDB;
