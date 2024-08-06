import mongoose, { connect, disconnect } from "mongoose";

const mongoDbUrl: string = process.env.MONGODB_URI as string || "mongodb+srv://rohitganguly450:syfgXgtI0CFPKEDp@cluster0.rieijoq.mongodb.net/chatbot?retryWrites=true&w=majority&appName=Cluster0";


  async function connectToDatabase(){
    try {
        await connect(mongoDbUrl);
        console.log("Connected to the database");
        
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to mongodb");
    }
}

async function disconnectFromDatabase(){
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect from mongodb");
    }
}

export {connectToDatabase,disconnectFromDatabase}