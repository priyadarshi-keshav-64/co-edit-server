import { connect } from "mongoose"
import { config } from "dotenv";
config();

const connectDB = async () => {
    try {
        const connection = await connect(process.env.DATABASE ? process.env.DATABASE : "")
        console.log(`MongoDB Connected ${connection.connection.host}`)
    } catch (error: any) {
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }

}

export default connectDB;