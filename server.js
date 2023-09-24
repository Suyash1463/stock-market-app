const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/stock/:symbol", async (req, res) => {
  const { symbol } = req.params;

  if (!symbol || typeof symbol !== "string" || symbol.length > 10) {
    return res.status(400).json({ error: "Invalid symbol" });
  }

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`
    );

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
