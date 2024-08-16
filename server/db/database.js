import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Alumnado");
        console.log("SE CONECTO A LA BASE DE DATOS DE MONGODB");
    } catch (error) {
        console.error("NO SE CONECTO A LA BASE DE DATOS DE MONGODB", error);
        process.exit(1);
    }
}