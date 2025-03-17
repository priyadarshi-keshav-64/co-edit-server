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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const database_config_1 = __importDefault(require("./config/database.config"));
const document_model_1 = __importDefault(require("./models/document.model"));
const router_1 = __importDefault(require("./routes/router"));
(0, database_config_1.default)();
const app = (0, express_1.default)();
app.use(router_1.default);
const server = app.listen(5000, () => console.log(`Express Server running on PORT 5000`));
const io = new socket_io_1.Server(server, {
    cors: {
        allowedHeaders: "*",
        credentials: true,
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("connected", socket.id);
    socket.on('get-document', (documentId) => __awaiter(void 0, void 0, void 0, function* () {
        const document = yield findOrCreateDocument(documentId);
        socket.join(documentId);
        socket.emit("load-document", document === null || document === void 0 ? void 0 : document.content);
        socket.on("send-changes", (data) => {
            socket.broadcast.to(documentId).emit("receive-changes", data);
        });
        socket.on("save-document", (data) => __awaiter(void 0, void 0, void 0, function* () {
            console.log({ deltaOps: data.ops });
            yield document_model_1.default.findByIdAndUpdate({ _id: documentId }, { content: data === null || data === void 0 ? void 0 : data.ops });
        }));
    }));
});
function findOrCreateDocument(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (id == null)
                return;
            let document = yield document_model_1.default.findById({ _id: id });
            if (document)
                return document;
            return yield document_model_1.default.create({ _id: id, content: "", name: `My document ${new Date()}` });
        }
        catch (error) {
            throw error;
        }
    });
}
