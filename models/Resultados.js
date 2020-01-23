const mongoose = require('mongoose');
const ResultadosSchema = mongoose.Schema({
    ID: Number,
    Title: String,
    Description: String,
    avatar:String,
    Image: String},
    {timestamps: true}
);
const Resultado = mongoose.model('Resultado', ResultadosSchema)
module.exports = Resultado