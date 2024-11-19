import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/namespace
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
const CoinGraph = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: 7,
            },
          }
        );

        const prices = response.data.prices.map((point) => ({
          time: new Date(point[0]).toLocaleDateString(),
          price: point[1],
        }));

        setChartData({
          labels: prices.map((point) => point.time),
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price (Last 7 Days)`,
              data: prices.map((point) => point.price),
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.2)',
              tension: 0.3,
            },
          ],
        });

      } catch (err) {
        console.error(err);
      }
    };

    fetchChartData();
  }, [coinId]);

  if (!chartData) {
    return <div>Loading chart data...</div>;
  }
  return (
    <div>
      <h2>{coinId.toUpperCase()} Price Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            legend: { display: true },
          },
          responsive: true,
        }}
      />
    </div>
  );
};
CoinGraph.propTypes = {
    coinId :  PropTypes.string.isRequired
};
export default CoinGraph;
