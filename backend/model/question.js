import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    category: String,
    questionText: String,
    correctAnswer: String,  
})

export default mongoose.model('question', questionSchema);