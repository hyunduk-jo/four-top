import express from "express";
const app = express()

const PORT = 4000;

const handleListening = () => {
    console.log(`✅Listening on: http://localhost:${PORT}`)
}

const handleHome = (req, res, next) => {
    res.send("Hello from home~!")
}

const handleProfile = (req, res) => {
    res.send("You are in my Profile!!")
}

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);