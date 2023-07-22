const mongoose  =require("mongoose")

const connectDB = mongoose.connect("mongodb://localhost:27017/assignment",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{console.log("Mongodb connected...")})
.catch((err)=>{console.log(err)})

module.exports = connectDB;