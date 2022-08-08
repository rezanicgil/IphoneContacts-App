const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
    ,
    surname: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    company: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 1,
        trim: true

    },
    mail: {
        type: String,
        required: false,
        minlength: 1,
        trim: true

    },
    address: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    imageSrc: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    }
    

}
)

const List = mongoose.model('List', ListSchema);

module.exports = { List };

