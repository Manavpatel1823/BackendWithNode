const Person = require('../models/submission.js');
const {redisClient} = require('../config/redis.js');

//post a person.
const postPerson = async (req, res) =>{
    try{
        const {name, email} = req.body;
    
        const saved = await Person.create({name, email});
        res.status(200).json({id: saved._id, saved: saved, message: "Data saved successfully!"});
    }catch(err){
        res.status(500).json({message: "server error.", error: err.message});
    }
}

//Get a data.
const getAllPerson = async (req, res) => {
    try{
        const cacheKey = 'persons:limit:100';
        const cacheVal = await redisClient.get(cacheKey);
        if (cacheVal){
            return res.status(200).json({message: " comming from REDIS.",
                                             data: JSON.parse(cacheVal)});
        }

        const list = await Person.find().limit(100);
        
        await redisClient.setEx(cacheKey, 60, JSON.stringify(list));
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

        const cacheKey = `person:${id}`;
        const cacheVal = await redisClient.get(cacheKey);
        if (cacheVal){
            return res.status(200).json({message: "This data is coming from Redis." ,
                                            data: JSON.parse(cacheVal)});
        }

        const person = await Person.findById(id);
        if (!person){
            return res.status(404).json({ message: "Person not found"});
        }

        await redisClient.setEx(cacheKey, 60, JSON.stringify(person));

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