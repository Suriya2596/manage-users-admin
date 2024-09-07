const { default: mongoose } = require("mongoose")
const db = "mongodb+srv://suriyajagan25:iSM0YKCKvf5jlQVc@cluster0.6obid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const configureDB  = ()=>{
    mongoose.connect(db).then(()=>{
        console.log("connect to db")
    }).catch((err)=>{
        console.log(err,"not connect to db")
    })
}
module.exports = configureDB