const express = require('express')
const path = require('path')
require('./DB/mongooseConnect')
const keyValue = require('./routers/keyvalue')

const app = express()
const PORT = process.env.PORT || 8000

clientPath = path.join(__dirname, '../client')
app.use(express.static(clientPath))

app.use(express.json())
app.use(keyValue)

app.listen(PORT , ()=>{
    console.log(`Server is up on ${PORT}`)
})