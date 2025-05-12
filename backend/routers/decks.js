import express from "express"
import {getMongoClient} from "../db.js";
import {verifyToken} from "../middleware/auth.js";
import {ObjectId} from "mongodb";
import {config} from "dotenv";
config();

const mongodbClient = await getMongoClient(process.env.MONGODB_URL)
const deckRouter = express.Router()
/*
deck= {
_id:ObjectId
name:string
description:string
user_id:string
}

 */
deckRouter.get("/mydecks",verifyToken, async (req,res)=>{
    const user_id = req.userId;
    const decks = mongodbClient.db("users").collection("decks").find({user_id:new ObjectId(user_id)});
    return res.status(200).send({status:"success",decks:await decks.toArray()});
})
deckRouter.put("/mydecks", verifyToken,async (req,res)=>{
    const user_id = req.userId;
    const newDeck = req.body;
    if (!newDeck.name||!newDeck.description){
        return res.status(400).send({status:"badRequest"});
    }
    else{
        newDeck.user_id = new ObjectId(user_id);
        const resp = await mongodbClient.db("users").collection("decks").insertOne(newDeck);
        return res.status(200).send({status:"success",deckId:resp.insertedId});
    }
})
deckRouter.patch("/mydecks", verifyToken,async (req,res)=>{
    const user_id = req.userId;
    const deck = req.body;
    if (!deck.name||!deck.description || !deck.id){
        return res.status(400).send({status:"badRequest"});
    }
    else{
        await mongodbClient.db("users").collection("decks").updateOne({_id:new ObjectId(deck.id),user_id:new ObjectId(user_id)},{$set:{
                name:deck.name,
                description:deck.description,
            }});
        return res.status(200).send({status:"success"})
    }
})
deckRouter.delete("/mydecks", verifyToken, async (req,res)=>{
    const {deckId} = req.query;
    await mongodbClient.db("users").collection("decks").deleteOne({_id:new ObjectId(deckId),user_id:new ObjectId(req.userId)});
    await mongodbClient.db("users").collection("cards").deleteMany({deckId:new ObjectId(deckId)});
    return res.status(200).send({status:"success"})
})
export default deckRouter;