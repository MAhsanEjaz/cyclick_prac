const mongoose = require('mongoose');

const data = mongoose.Schema({

    userName:{

        type: String,

    }

})

module.exports = mongoose.model('usermodel', data);