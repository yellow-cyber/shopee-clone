//AMO INI IT MODEL HIN USER HA DATABASE


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//ITO KAILANGAN NIYO SA PAG REGISTER EXCPET SA HASH AND CREATED DATE
const schema = new Schema({
    productId: { type: String, unique: true, required: true },
    ownerid: { type: String, required: true },
    ownername: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: String, required: true },
    description: { type: String, required: true },
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

module.exports = mongoose.model('products', schema);