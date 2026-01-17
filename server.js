import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test
app.get("/", (req, res) => {
  res.send("WuptiMC backend kører 🚀");
});

// Login (simpel version)
app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Manglende brugernavn" });
  }

  res.json({
    username,
    coins: 100,
    rank: "Member"
  });
});

app.listen(PORT, () => {
  console.log("Server kører på port " + PORT);
});
