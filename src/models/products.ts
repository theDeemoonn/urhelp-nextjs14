import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
    {
        title: {
        type: String,
        required: true,
        },
        price: {
        type: Number,
        },
        description: {
        type: String,
        },
        category: {
        type: String,
        },
        date: {
        type: String,
        },
        reviews: [
        {
            name: { type: String },
            rating: { type: Number },
            comment: { type: String },
            user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
        },
        ],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
    },
    { timestamps: true }
    );

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;