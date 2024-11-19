/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (!value.trim()) {
      setCoinData([]);
      return;
    }

    const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/search?query=${value}`,
      headers: { accept: 'application/json', 'x-cg-api-key': API_KEY },
    };

    setLoading(true);
    setError(null);
    axios
      .request(options)
      .then((res) => {
        setCoinData(res.data.coins || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  }, [value]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search coin..."
        className="search-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      {loading && <div className="loading">Loading...</div>}

      {error && <div className="error">{error}</div>}

      <div className="coin-results">
        {coinData.length > 0 ? (
          <ul>
            {coinData.map((coin) => (
              <li key={coin.id} className="coin-item" onClick={() => {navigate(`/coin/${coin.id}`);}}>
                <img src={coin.thumb} alt={coin.name} className="coin-image" />
                <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className='coin-results' />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
