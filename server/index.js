const express = require("express")
const cors = require("cors")
const configureDB = require("./config/database")

const app = express()
const PORT  = 3099

configureDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(PORT,()=>{
    console.log("Port is running on",PORT)
})
