import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://omarrabbani:Canadiens31@cluster1.owmlu.mongodb.net/FruitCravingsSite').then(()=>console.log("DB Connected"));
}