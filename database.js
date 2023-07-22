const mongoose  =require("mongoose")

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/excited-quiz-app"
const connectDB = mongoose.connect(MONGO_URI,{
// const connectDB = mongoose.connect("mongodb://localhost:27017/assignment",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{console.log("Database connected successfylly.")})
.catch((err)=>{console.log(err)})

module.exports = connectDB;