import express from "express"
import {getMongoClient} from "../db.js";
import {verifyToken} from "../middleware/auth.js";
import {ObjectId} from "mongodb";
import {config} from "dotenv";
config();

const mongodbClient = await getMongoClient(process.env.MONGODB_URL)
const cardsRouter = express.Router()
/*
* card:{
* name:string,
* answer:string,
* deck_id:ObjectId
* }
*/
cardsRouter.get("/mycards",verifyToken, async (req,res)=>{
    const user_id = req.userId;
    const {deck_id} = req.query;
    if (!deck_id){
        return res.status(400).send({status:"badRequest"});
    }
    const decks = mongodbClient.db("users").collection("decks").find({user_id:new ObjectId(user_id),deck_id:new ObjectId(deck_id)});
    if (!decks){
        return res.status(400).send({status:"badRequest"});
    }
    const cards = mongodbClient.db("users").collection("cards").find({deck_id:new ObjectId(deck_id)});
    return res.status(200).send({status:"success",cards:await cards.toArray()});
})
cardsRouter.put("/mycards", verifyToken,async (req,res)=>{
    const user_id = req.userId;
    const newCard = req.body;
    console.log(newCard);
    if (!newCard.name||!newCard.answer||!newCard.deck_id){
        return res.status(400).send({status:"badRequest"});
    }
    else{
        let existence = await mongodbClient.db("users").collection("decks").findOne({_id:new ObjectId(newCard.deck_id),user_id:new ObjectId(user_id)});
        if (existence){
            const result = await mongodbClient.db("users").collection("cards").insertOne({
                name:newCard.name,
                answer:newCard.answer,
                deck_id:new ObjectId(newCard.deck_id),
            });
            return res.status(200).send({status:"success",id:result.insertedId});
        }
        return res.status(400).send({status:"badRequest"});
    }
})
cardsRouter.patch("/mycards", verifyToken,async (req,res)=>{
    const user_id = req.userId;
    const newCard = req.body;
    if (!newCard.id||!newCard.name||!newCard.answer||!newCard.deck_id){
        return res.status(400).send({status:"badRequest"});
    }
    else{
        let existence = await mongodbClient.db("users").collection("decks").findOne({_id:new ObjectId(newCard.deck_id),user_id:new ObjectId(user_id)});
        if (existence){
            await mongodbClient.db("users").collection("cards").updateOne({_id:new ObjectId(newCard.id),deck_id:new ObjectId(newCard.deck_id)},{$set:{
                    name:newCard.name, answer:newCard.answer,
                }});
            return res.status(200).send({status:"success"});
        }
        return res.status(400).send({status:"badRequest"});
    }
})
cardsRouter.delete("/mycards", verifyToken, async (req,res)=>{
    const user_id = req.userId;
    const {id} = req.query;
    if (!id){
        return res.status(400).send({status:"badRequest"});
    }
    let existence = await mongodbClient.db("users").collection("cards").findOne({_id:new ObjectId(id)});
    if (existence){
        const result = await mongodbClient.db("users").collection("decks").findOne({_id:new ObjectId(existence.deck_id),user_id:new ObjectId(user_id)});
        if (result) {
            await mongodbClient.db("users").collection("cards").deleteOne({_id: new ObjectId(id)});
            return res.status(200).send({status:"success"});
        }
    }
    return res.status(400).send({status:"badRequest"});
})
export default cardsRouter;