const { default: mongoose } = require("mongoose")
const { default: isEmail } = require("validator/lib/isEmail")

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function (value) {
                return isEmail(value)
            },
            message: function (props) {
                return `${props?.value} Email address is invaildate`
            }
        }
    },
    mobile: {
        type: Number,
        required: [true, "Mobile is required"],
        min: [10, 'Mobile should be 10 number'],
        max: [10, 'Mobile should be 10 number'],
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props?.value} is not a valid phone number!`
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        maxlength: [128, "Password is too long"],
        minlength: [8, "Password is too short"],
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Role is required"],
        ref: "Role",
    },
    permission:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "Permission"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User