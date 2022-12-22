const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
    chave: String,
    duração: String,
    ativado: {type: Boolean, default: false}
})

const model = mongoose.model("Chaves_Premium", keySchema);

module.exports = model;