//AMO INI IT MODEL HIN USER HA DATABASE


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//ITO KAILANGAN NIYO SA PAG REGISTER EXCPET SA HASH AND CREATED DATE
const schema = new Schema({
    userid: { type: String, required: true },
    itemid: { type: String, required: true },
    quantity: { type: String, required: true },
    price: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Cart', schema);