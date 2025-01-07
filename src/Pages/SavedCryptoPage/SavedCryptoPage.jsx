/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Header from '../../Components/Header/Header.jsx';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const SavedCryptoPage = () => {
    const navigate = useNavigate();
    const [savedCryptos, setSavedCryptos] = useState([]);

    useEffect(() => {
      const saved = JSON.parse(localStorage.getItem('savedCryptos')) || [];
      setSavedCryptos(saved);
    }, []);
  
    return (
      <>
        <Header />
        <div className="crypto-table-container">
          <h1 className="title">Saved Cryptocurrencies</h1>
          {savedCryptos.length === 0 ? (
            <p className="error">No saved cryptocurrencies. Start adding some!</p>
          ) : (
            <table className="crypto-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>24h Volume</th>
                  <th>Price Change (24h)</th>
                </tr>
              </thead>
              <tbody>
                {savedCryptos.map((crypto, index) => (
                  <tr key={crypto.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="coin-info" onClick={() => {navigate(`/coin/${crypto.id}`);}}>
                        <img
                          src={crypto.image}
                          alt={crypto.name}
                          className="coin-image"
                        />
                        <div>
                          <span className="coin-name">{crypto.name}</span>
                          <br />
                          <span className="coin-symbol">
                            {crypto.symbol.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>${crypto.current_price.toFixed(5).toLocaleString()}</td>
                    <td>${crypto.market_cap.toLocaleString()}</td>
                    <td>${crypto.total_volume.toLocaleString()}</td>
                    <td
                      className={
                        crypto.price_change_percentage_24h >= 0
                          ? 'positive-change'
                          : 'negative-change'
                      }
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </>
    );
};

export default SavedCryptoPage;