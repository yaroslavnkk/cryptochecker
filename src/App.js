import './App.css';
import HomePage from './Pages/HomePage/HomePage.jsx';
import CoinInfo from './Pages/CoinInfoPage/CoinInfo.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Exchanges from './Pages/ExchangesPage/Exchanges.jsx';
import AboutPage from './Pages/AboutPage/AboutPage.jsx';
import SavedCryptoPage from './Pages/SavedCryptoPage/SavedCryptoPage.jsx';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coin/:coinId" element={<CoinInfo />} />
        <Route path="/exchanges" element={<Exchanges/>} />
        <Route path='/about' element={<AboutPage/>} />
        <Route path='/saved' element={<SavedCryptoPage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
