const { default: mongoose } = require("mongoose")
const db = "mongodb+srv://suriyajagan25:MCizwaT6GmejMjKo@cluster0.ahtjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const configureDB  = ()=>{
    mongoose.connect(db).then(()=>{
        console.log("connect to db")
    }).catch((err)=>{
        console.log(err,"not connect to db")
    })
}

module.exports = configureDB