import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () =>{
try {
    if(!process.env.MONGODB_URI){
        return console.log("MONGODB_URI çevre değişkeni tanımlanmamış.")
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`MongoDB bağlandı`)
} catch (error) {
    console.log("MongoDB bağlantı hatası", error)
}
}
export default connectDB