import express from "express"
import {getMongoClient} from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "dotenv";
config();
/*
user={
login:string,
password:string
}
 */

const mongodbClient = await getMongoClient(process.env.MONGODB_URL);
const SECRET = process.env.SECRET;

const userRouter = express.Router()
userRouter.post("/register", async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send({status:"credentialsError"});
    }
    else{
        try {
            let hashedPassword = await bcrypt.hash(password, 10)
            const user = await mongodbClient.db("user").collection("users").insertOne({
                email: email,
                password: hashedPassword
            })
            const token = jwt.sign({id: user.insertedId,type:"ACCESS"}, SECRET, {expiresIn: "1h"});
            const refreshToken = jwt.sign({id: user.insertedId,type:"REFRESH"}, SECRET, {expiresIn: "12h"});
            return res.status(200).send({status:"success",token:token,refreshToken:refreshToken});
        }
        catch (error){
            return res.status(500).send({status: "serverError"});
        }
    }
})
userRouter.post("/login", async (req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).send({status:"credentialsError"});
    }
    else{
        try {
            let user = await mongodbClient.db("user").collection("users").findOne({email: email})
            if (!user){
                return res.status(400).send({status:"notFoundError"});
            }
            let comparison = await bcrypt.compare(password, user.password);
            if (comparison){
                const token = jwt.sign({id: user._id,type:"ACCESS"}, SECRET, {expiresIn: "1h"});
                const refreshToken = jwt.sign({id: user._id,type:"REFRESH"}, SECRET, {expiresIn: "12h"});
                return res.status(200).send({status:"success",token:token,refreshToken:refreshToken});
            }
            return res.status(400).send({status:"checkCredentialsError"});
        }
        catch(error){
            console.log("error",error);
            return res.status(500).send({status:"serverError"});
        }
    }
})
userRouter.post("/refreshToken", async (req,res)=>{
    const {refreshToken} = req.body;
    try{
        const token = jwt.verify(refreshToken, SECRET);
        if (token.type==="REFRESH"){
            const newAccessToken = jwt.sign({id: token.id,type:"ACCESS"},SECRET, {expiresIn: "1h"});
            return res.status(200).send({status:"success",token:newAccessToken});
        }
        return res.status(400).send({status:"refreshTokenError"});
    }
    catch(error){
        return res.status(400).send({status:"refreshTokenError"});
    }
})
export default userRouter;