const mongoose = require('mongoose');

const KeyValue = mongoose.model('KeyValue' , {

    key:{
        type: Number ,
        required : true,
        trim : true
    },
    value:{
        type: String ,
        required : true,
        trim : true
    },
    history:[String]
})

module.exports = KeyValue