import mongoose, { model } from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    category: {type:String,required:true},
    image: {type:String,required:true}
}, { collection: 'foods' });

const foodModel = mongoose.models.food || model("food", foodSchema);

export default foodModel;