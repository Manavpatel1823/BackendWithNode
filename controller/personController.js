const Person = require('../models/submission.js');

//post a person.
const postPerson = async (req, res) =>{
    try{
        const {name, email} = req.body;
    
        const saved = await Person.create({name, email});
        res.status(200).json({saved: saved, message: "Data saved successfully!"});
    }catch(err){
        res.status(500).json({message: "server error.", error: err.message});
    }
}

//Get a data.
const getAllPerson = async (req, res) => {
    try{
        const list = await Person.find().limit(100);
    
        res.json(list);
    }catch(err) {
        console.error("Error fetching submissions:", err);
        res.status(500).json({ message: "Error fetching data" });
    }
}

//get a data by id.
const getPerson = async (req, res) => {
    try{
        const {id} = req.params;

        const person = await Person.findById(id);
        if (!person){
            return res.status(404).json({ message: "Person not found"});
        }
        res.status(200).json(person);

    }catch(err){
        res.status(500).json("Error msg.")
    }
}

//update a person.
const updatePerson = async (req, res) => {
    try{
        const {id} = req.params;
        
        const person = await Person.findByIdAndUpdate(id, req.body, {new: true});

        if(!person){
            return res.status(404).json({message: "person not found!!"});
        }
        res.status(200).json(person);

    }catch(err){
        res.status(500).json("server error!");
    }
}

//delete a person.
const deletePerson = async (req, res) => {
    try{
        const {id} = req.params;
        
        const person = await Person.findByIdAndDelete(id);

        if(!person){
            return res.status(404).json({message: "person not found!!"});
        }
        res.status(200).json({message: "person deleted from the database."});

    }catch(err){
        res.status(500).json("server error!");
    }
}

module.exports = {
    postPerson, getAllPerson, getPerson, updatePerson, deletePerson
}