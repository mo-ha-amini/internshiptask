const mongoose =require('mongoose')

mongoose.connect("mongodb+srv://Hami:Mohammad1379@cluster0.oaiep.mongodb.net/InternProject?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

console.log('Connected To Database.')