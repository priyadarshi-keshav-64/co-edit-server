import express from "express"
import { Server } from "socket.io"
import connectDB from "./config/database.config";
import Document from "./models/document.model";
import router from "./routes/router";
connectDB();

const app = express()
app.use(router)
const server = app.listen(process.env.PORT, () => console.log(`Express Server running on PORT ${process.env.PORT}`))

const io = new Server(server, {
    cors: {
        allowedHeaders: "*",
        credentials: true,
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.on('get-document', async documentId => {
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit("load-document", document?.content)

        socket.on("send-changes", (data) => {
            socket.broadcast.to(documentId).emit("receive-changes", data)
        })

        socket.on("save-document", async data => {
            console.log({ deltaOps: data.ops })
            await Document.findByIdAndUpdate({ _id: documentId }, { content: data?.ops })
        })
    })
})

async function findOrCreateDocument(id: string) {
    try {
        if (id == null) return;
        let document = await Document.findById({ _id: id })
        if (document) return document;
        return await Document.create({ _id: id, content: "", name: `My document ${new Date()}` })
    } catch (error) {
        throw error
    }
}