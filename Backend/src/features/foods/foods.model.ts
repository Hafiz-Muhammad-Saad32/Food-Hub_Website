import {Document} from "mongoose";
import mongoose from "mongoose";

export interface foodType extends Document{
    title: string,
    description: string,
    price: number,
    catagory: string[],
    quantity: number,
    inStock: boolean,
    image: string,
    deletedAt: {}
}

const foodModel = new mongoose.Schema<foodType>(
    {
        title: { type: String },
        description: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        inStock: { type: Boolean },
        catagory: { type: [String] },
        image: { type: String },
        deletedAt: {type: Date,default: null}
    },
    {
        timestamps: true
    }
)

export default mongoose.model<foodType>("Foods", foodModel);