const { default: mongoose, Schema } = require("mongoose");

const mangoose=requuire("mongoose");


const userSchema=new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports=mangoose.model("User",userSchema);