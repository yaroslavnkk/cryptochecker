import './AboutPage.css';
import Header from '../../Components/Header/Header.jsx';

const AboutPage = () => {
    return (
      <>
      <Header />
      <div className="about-page-container">
        <h1 className="title">About Crypto Checker</h1>
        <p className='about-paragraph'>
          Welcome to Crypto Tracker, your go-to platform for monitoring cryptocurrency prices
          and trends in real-time. Our mission is to make cryptocurrency tracking easy,
          accessible, and user-friendly for everyone, whether you&apos;re a seasoned trader or
          a curious beginner.
        </p>

        <p className='about-paragraph'>
          With Crypto Tracker, you can:
        </p>
        <ul className='about-list'>
          <li>Stay updated with the latest prices of popular cryptocurrencies.</li>
          <li>Analyze market trends with an easy-to-use interface.</li>
          <li>Access detailed information about coins, including symbols, price changes, and more.</li>
        </ul>

        <p>
          Our platform is designed with a sleek and responsive interface, ensuring a seamless
          experience across all devices. Whether you&apos;re on a desktop or mobile device, you&apos;ll
          find everything you need to stay informed about the crypto market.
        </p>

        <p>
          Start exploring the world of cryptocurrencies today with Crypto Checker. We&apos;re here to
          help you make informed decisions and stay ahead in this dynamic market.
        </p>
      </div></>
  );
};

export default AboutPage;