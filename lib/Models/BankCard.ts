import { Schema, model, models } from 'mongoose'

const bankCartSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bankName: { type: String, required: true },
        branch: { type: String, required: true },
        cardNumber: { type: Number, required: true },
        cvv: { type: Number, required: true },
        expireDate: { type: String, required: true }
    }, { timestamps: true }
);

const banckCardModel = models.BankCard || model('BankCard', bankCartSchema);

export default banckCardModel;