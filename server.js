import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test endpoint
app.get("/", (req, res) => {
  res.send("WuptiMC backend kører 🚀");
});

app.listen(PORT, () => {
  console.log("Server kører på port " + PORT);
});
