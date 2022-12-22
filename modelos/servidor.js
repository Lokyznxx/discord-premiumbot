const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    guildID: String,
    premium: {type: String, default: ""},
    idioma: {type: String, default: "pt-BR"},
})

const model = mongoose.model("ConfigServer", serverSchema);

module.exports = model;