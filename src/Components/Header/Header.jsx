import './Header.css';
export const Header = () => {
  return <header>
     <header className="header">
      <div className="header-container">
        <h1 className="logo">Crypto Checker</h1>
        <nav>
          <ul className="nav-list">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#services" className="nav-link">Services</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  </header>;
};

export default Header;