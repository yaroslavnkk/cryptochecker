import { useEffect, useState } from 'react';
import axios from 'axios';
function useDisplayData(){
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = process.env.REACT_APP_API_KEY;
    useEffect(() => {
      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        params: {
          vs_currency: 'usd', 
          order: 'market_cap_desc',
          per_page: 30, 
          page: 1,
          sparkline: false, 
        },
        headers: { accept: 'application/json', 'x-pro-api-key': API_KEY }
      };
  
      axios
        .request(options)
        .then((res) => {
          setCryptoData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to fetch cryptocurrency data');
          setLoading(false);
        });
    }, []);
  
  return [cryptoData, loading, error];
}

export default useDisplayData;