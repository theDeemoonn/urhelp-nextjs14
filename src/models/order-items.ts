import mongoose, { Schema, models } from "mongoose";

const orderItemsSchema = new Schema(
    {
        title: {
        type: String,
        required: true,
        },
        logo: {
        type: String,
        },
        description: {
        type: String,
        },
    },
)

const orderItems= models.Product || mongoose.model("orderItems", orderItemsSchema);
export default orderItems;