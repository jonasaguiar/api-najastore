const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    valor: {
        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    imagem: {
        type: String,
        required: true,
        trim: true
    }



});

module.exports = mongoose.model('Produto', schema);

