import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
    {
        productName: { type: String, required: true },
        productDescription: { type: String, required: true },
        price: {
            newPrice: { type: Number, required: true, min: 1 },
            oldPrice: { type: Number, required: false, min: 1 }
        },
        categories: {
            type: [String],
            required: true,
            validate: {
                validator: (categories: String[]) => categories.length > 0,
                message: "At least one category is required."
            }
        },
        harvestingDate: { type: Date, required: true },
        agricationMethod: { type: String, required: true },
        freeDelivery: { type: Boolean, required: true }
    },
    { timestamps: true }
);

const productModel = models.Product || model("Product", productSchema);

export default productModel;
