import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect("mongodb+srv://tejasg4646:tejasg4646@cluster0.yfsqmuf.mongodb.net/?retryWrites=true&w=majority")
    .then(()=> console.log("MongoDB connected..."))
    .catch((err) => console.log("ERROR --- ", err))
}

export default connectDB;