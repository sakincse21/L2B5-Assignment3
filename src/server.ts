import mongoose from "mongoose";
import app from "./app";
import { mongodb_url, port } from "./app/config";


const startServer = async function(){
    try {
        await mongoose.connect(mongodb_url as string);
        console.log("MongoDB server connected successfully...✅")
        app.listen(port, () => {
            console.log(`Server running on port ${port}...✅`);
        })
    } catch (error) {
        console.log(error)
    }
}

startServer();