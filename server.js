import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/**
 * Fake database (gratis / simpelt)
 * Senere kan det være SQLite / Postgres
 */
const users = {};

// TEST
app.get("/", (req, res) => {
  res.send("WuptiMC backend kører 🚀");
});

/**
 * DISCORD LOGIN (SIMPLIFICERET DEMO)
 * Senere kan vi koble ægte Discord OAuth
 */
app.post("/login/discord", (req, res) => {
  const { discordName } = req.body;

  if (!users[discordName]) {
    users[discordName] = {
      discordName,
      role: discordName === "Wupti" ? "admin" : "spiller",
      minecraftName: "",
      email: ""
    };
  }

  res.json(users[discordName]);
});

/**
 * OPDATER PROFIL
 */
app.post("/profile/update", (req, res) => {
  const { discordName, minecraftName, email } = req.body;

  if (!users[discordName]) {
    return res.status(403).json({ error: "Ikke logget ind" });
  }

  users[discordName].minecraftName = minecraftName;
  users[discordName].email = email;

  res.json(users[discordName]);
});

/**
 * ADMIN – LIST ALLE BRUGERE
 */
app.get("/admin/users", (req, res) => {
  const { discordName } = req.query;

  if (!users[discordName] || users[discordName].role !== "admin") {
    return res.status(403).json({ error: "Ingen adgang" });
  }

  res.json(Object.values(users));
});

app.listen(PORT, () => {
  console.log("Server kører på port " + PORT);
});
