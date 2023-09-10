import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri ="mongodb+srv://blink:puru2905@cluster0.stxq0xf.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(uri, {
            useNewUrlParser : true ,  
            useUnifiedTopology : true
        });
        
    }
    catch (err) {
        console.log(err);
    }
} 

export default connectDB;