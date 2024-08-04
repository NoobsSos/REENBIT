import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.set("strictQuery", false); 
  
    mongoose   
        .connect(process.env.MONGO_URL) 
        .then(function () {
            console.log("DB_connected");
        })
        .catch(function (err) {
            console.log("error", err);
        })
}
