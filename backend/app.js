import express from "express";
import cors from "cors";
import users from "./routers/users.js";
import decks from "./routers/decks.js";
import cards from "./routers/cards.js";
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin:"http://127.0.0.1:4173"// СЮДА АЙПИ ФРОНТЕНДА
}))
app.use("/users",users)
app.use(decks)
app.use(cards)
app.listen(8000)