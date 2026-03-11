const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToServer } = require("./db/conn");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CSE 341 Contacts API - Week 01",
  });
});

app.use("/contacts", require("./routes/contacts"));

connectToServer((err) => {
  if (err) {
    console.error("MongoDB connection failed. Server not started.");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
