const mongoose = require('mongoose');

const schema = mongoose.Schema;

let querySchema = new schema({
    query: String
});

module.exports = mongoose.model('Query', querySchema);