var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PhotoSchema = new Schema(
    {
        id: { type: String, required: true },
        dono: { type: String, required: true },
        nome: { type: String, required: true },
        descricao: { type: String, required: false },
        photo: { type: String, required: true },
        likes: [String]
    }
);

module.exports = mongoose.model('Photo', PhotoSchema);