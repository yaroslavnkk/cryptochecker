/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useNavigate } from 'react-router-dom';
import './Header.css';
export const Header = () => {
  const navigate = useNavigate();
  return <header>
     <header className="header">
      <div className="header-container">
        <h1 className="logo">Crypto Checker</h1>
        <nav>
          <ul className="nav-list">
            <li className="nav-link" onClick={() => {navigate('/');}}>Home</li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li className="nav-link" onClick={() => {navigate('/exchanges');}}>Exchanges</li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  </header>;
};

export default Header;