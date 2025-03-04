import mongoose from "mongoose";

const monogoDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongodb connected successfull")
    } catch (error) {
        console.log("mongodb note connect", error.message)
    }
}
export default monogoDB;