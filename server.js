const express = require('express');
const app = express();

app.use(express.json());

// 確認用 API
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// データを送ってもらうAPI（例）
app.post("/send", (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Running on " + port));
