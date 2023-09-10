import mongoose from "mongoose";

const testHistorySchema = mongoose.Schema({
    // userId: String,
    category: String,
    score: Number,
});

export default mongoose.model("testHistory", testHistorySchema);