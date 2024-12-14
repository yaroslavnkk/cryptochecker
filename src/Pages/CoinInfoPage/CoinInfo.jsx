import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header.jsx';
import './CoinInfo.css';
import CoinGraph from '../../Components/CoinGraph/CoinGraph.jsx';

const CoinInfo = () => {
  const { coinId } = useParams(); 
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${coinId}`,
      headers: { accept: 'application/json', 'x-cg-api-key': API_KEY },
    };

    axios
      .request(options)
      .then((res) => {
        setCoinData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch coin data.');
        setLoading(false);
      });
  }, [coinId]);

  if (loading)
    {
        return <div className="loading">Loading...</div>;
    }
  if (error)
    {
        return <div className="error">{error}</div>;
    }

  return (
    <>
     <Header />
    <div className="coin-info-container">
      <div className="coin-header">
        <img src={coinData.image.large} alt={coinData.name} className="coin-info-image" />
        <h1>{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
      </div>
      <div className="coin-details">
        <p><strong>Market Cap Rank:</strong> #{coinData.market_cap_rank}</p>
        <p><strong>Current Price:</strong> ${coinData.market_data.current_price.usd.toLocaleString()}</p>
        <p><strong>24h Change:</strong> {coinData.market_data.price_change_percentage_24h.toFixed(2)}%</p>
        <p><strong>Description:</strong> {coinData.description.en.split('. ')[0] || 'No description available.'}</p>
        <a href={coinData.links.homepage[0]} target="_blank" rel="noreferrer" className="coin-link">
          Official Website
        </a>
      </div>
      <CoinGraph coinId={coinData.id}/>
    </div>
    </>
  );
};

export default CoinInfo;