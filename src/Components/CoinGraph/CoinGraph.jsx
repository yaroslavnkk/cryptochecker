import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
// eslint-disable-next-line import/namespace
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinGraph = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState(7); // Початковий період 7 днів
  const [isLoading, setIsLoading] = useState(false);

  const fetchChartData = async (range) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: range,
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
            label: `${coinId.toUpperCase()} Price`,
            data: prices.map((point) => point.price),
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            tension: 0.3,
          },
        ],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData(timeRange);
  }, [coinId, timeRange]);

  const handleTimeRangeChange = (event) => {
    setTimeRange(Number(event.target.value));
  };

  if (isLoading || !chartData) {
    return <div>Loading chart data...</div>;
  }

  return (
    <div>
      <h2>{coinId.toUpperCase()} Price Chart</h2>
      <div>
        <label htmlFor="time-range">Select Time Range: </label>
        <select
          id="time-range"
          value={timeRange}
          onChange={handleTimeRangeChange}
        >
          <option value={0.5}>Last 12 hours</option>
          <option value={1}>Last day</option>
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 Days</option>
        </select>
      </div>
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
  coinId: PropTypes.string.isRequired,
};

export default CoinGraph;
