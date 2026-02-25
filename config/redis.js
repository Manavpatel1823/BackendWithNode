//initialize redis.
const redis = require('redis');
require("dotenv").config();

//create client.
const redisClient = redis.createClient({url : process.env.REDIS_URL || "redis://localhost:6379"});

//error checking.
redisClient.on("error", (err) => console.error("Redis Client Error", err));

const connectRedis = async () =>{
        if(!redisClient.isOpen){
            await redisClient.connect();
            console.log("Redis connect successfully!!!");
        }
}

module.exports = {redisClient, connectRedis};





