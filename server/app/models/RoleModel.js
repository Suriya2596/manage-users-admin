const { default: mongoose } = require("mongoose");

const { Schema} = mongoose

const roleModel = new Schema({
    roleType:{
        type:String,
        required: [true, "Role type is required"],
        unique: true,
    },
    title:{
        type:String,
        required: [true, "Role title is required"],
    }
},{timestamps:true})

const Role = mongoose.model("Role",roleModel)

module.exports = Role