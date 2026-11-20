import { Link } from 'react-router-dom';
import Logo from '../Logo';
import facebookIcon from '../../assets/facebook.svg';
import instagramIcon from '../../assets/instagram.svg';
import twitterIcon from '../../assets/twitter.svg';
import './Footer.css';

function FooterInformation({ title, informations = [] }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <ul>
        {informations.map((item) => (
          <li key={item.text}>
            {item.link.startsWith('/') ? (
              <Link to={item.link}>{item.text}</Link>
            ) : (
              <a href={item.link}>{item.text}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const infoLinks = [
  { text: 'Sobre Drip Store', link: '/about' },
  { text: 'Segurança', link: '/seguranca' },
  { text: 'Wishlist', link: '/wishlist' },
  { text: 'Blog', link: '/blog' },
  { text: 'Trabalhe conosco', link: '/carreiras' },
  { text: 'Meus Pedidos', link: '/meus-pedidos' },
];

const categoryLinks = [
  { text: 'Camisetas', link: '/produtos' },
  { text: 'Calças', link: '/produtos' },
  { text: 'Bonés', link: '/produtos' },
  { text: 'Headphones', link: '/produtos' },
  { text: 'Tênis', link: '/produtos' },
];

const contactLinks = [
  {
    text: 'Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161',
    link: '#contato',
  },
  { text: '(85) 3051-3411', link: 'tel:8530513411' },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <Logo variant="footer" />
            <p className="footer-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <div className="footer-socials">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <img src={facebookIcon} alt="Facebook" width={11} height={21} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <img src={instagramIcon} alt="Instagram" width={21} height={21} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <img src={twitterIcon} alt="Twitter" width={23} height={19} />
              </a>
            </div>
          </div>

          <div className="footer-columns">
            <FooterInformation title="Informação" informations={infoLinks} />
            <FooterInformation title="Categorias" informations={categoryLinks} />
            <FooterInformation title="Contato" informations={contactLinks} />
          </div>
        </div>

        <hr className="footer-divider" />

        <p className="footer-copy">© 2024 Digital Store</p>
      </div>
    </footer>
  );
}

export default Footer;
