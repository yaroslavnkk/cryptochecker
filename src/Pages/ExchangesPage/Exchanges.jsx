import { useState, useEffect } from 'react';
import './Exchanges.css';
import Header from '../../Components/Header/Header.jsx';
import axios from 'axios';

const Exchanges = () => {
    const [exchangesData, setCryptoData] = useState([]);
    const API_KEY = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/exchanges',
            headers: {accept: 'application/json', 'x-cg-api-key': API_KEY}
          };
          axios
          .request(options)
          .then((res) => setCryptoData(res.data))
          .catch((error) => {
            console.log(error);
          });
    },[]);
    return <>
     <Header />
     <div className="exchanges-container">
     <h1 className="title">Exchanges</h1>
        <table className="exchange-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Exchange</th>
              <th>Country</th>
              <th>Url</th>
              <th>Trust Score</th>
              <th>Trust Score Rank</th>
            </tr>
          </thead>
          <tbody>
            {exchangesData.map((crypto, index) => (
              <tr key={crypto.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="exchange-info">
                    <img
                      src={crypto.image}
                      alt={crypto.id}
                      className="exchange-image"
                    />
                    <div>
                      <span className="exchange-name">{crypto.name}</span>
                    </div>
                  </div>
                </td>
                <td>{crypto.country}</td>
                <td>{crypto.url}</td>
                <td>{crypto.trust_score}</td>
                <td>{crypto.trust_score_rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>
    </>;
};
export default Exchanges;