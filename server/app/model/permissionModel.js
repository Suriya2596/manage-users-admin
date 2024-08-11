const { default: mongoose } = require("mongoose");

const { Schema} = mongoose

const permissionModel = new Schema({
    lable:{
        type:String,
        required: [true, "Permission lable is required"],
        unique: true,
    },
    title:{
        type:String,
        required: [true, "Permission title is required"],
    },
    read:{
        type:Boolean,
        default:false
    },
    write:{
        type:Boolean,
        default:false
    },
    update:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const Permission = mongoose.model("Permission",permissionModel)

module.exports = Permission