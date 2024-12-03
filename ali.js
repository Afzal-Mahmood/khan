const express = require('express')
const app = express()
const port = 5000
const mongoose = require ('mongoose')


const connectDB = async()=>
    await mongoose.connect(mongodb+srv://afzal:<db_password>@cluster222.ef8on.mongodb.net/
    )