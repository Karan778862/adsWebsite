import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    adId: { type: mongoose.Schema.Types.ObjectId, ref: "Add", required: true },
    userIp: { type: String, required: true },
    userAgent: String,  // Browser ya device ka info
    createdAt: { type: Date, default: Date.now },
    
})

export default  mongoose.model("Click",clickSchema)