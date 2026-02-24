const mongoose = require("mongoose")

// create schema + model.
const personSchema = new mongoose.Schema(
    {
        name : {type: String, required: true, trim: true},
        email : {type: String, required: true, trim: true},
    },{timestamps: true}
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;