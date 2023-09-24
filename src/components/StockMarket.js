import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StockMarket.css";

function StockMarket() {
  const [symbol, setSymbol] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (symbol) {
      setLoading(true);
      try {
        const response = await axios.get(`/api/stock/${symbol}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div className="StockMarket">
      <h1>Stock Market App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a stock symbol (e.g., AAPL)"
          className="form-control"
          value={symbol}
          onChange={handleSymbolChange}
        />
        <button className="btn-search" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : data && data["Time Series (5min)"] ? (
        <div className="StockData">
          <h2>{symbol} Stock Data</h2>
          <ul className="list-group">
            {/* Rest of your code for displaying stock data */}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default StockMarket;
