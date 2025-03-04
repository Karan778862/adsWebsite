import mongoose from "mongoose";

const AddSchema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    targetUrl: String,
    impressions: { type: Number, default: 0 },
    clicks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Click" }]
    
})

export default  mongoose.model("Add",AddSchema)