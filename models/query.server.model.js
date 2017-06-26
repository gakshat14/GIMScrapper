const mongoose = require('mongoose');

const schema = mongoose.Schema;

//Creatting Schema
let querySchema = new schema({
    query: String
});

//Creating Model
module.exports = mongoose.model('Query', querySchema);