import { Link } from 'react-router-dom';
import Layout from './Layout';
import Gallery from '../components/Gallery';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';
import { featuredCollections, homeSlides, products } from '../data/products';
import catTshirt from '../assets/cat-tshirt.svg';
import catPants from '../assets/cat-pants.svg';
import catHeadphones from '../assets/cat-headphones.svg';
import catSneakers from '../assets/cat-sneakers.svg';
import airJordanOffer from '../assets/air-jordan-offer.png';
import './HomePage.css';

const categoryIcons = [
  { label: 'Camisetas', icon: catTshirt, flipped: true, href: '/produtos' },
  { label: 'Calças', icon: catPants, flipped: true, href: '/produtos' },
  { label: 'Bonés', icon: null, flipped: false, href: '/produtos' },
  { label: 'Headphones', icon: catHeadphones, flipped: true, href: '/produtos' },
  { label: 'Tênis', icon: catSneakers, flipped: true, href: '/produtos?categoria=T%C3%AAnis' },
];

function CapIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <path
        d="M12 36C12 23.85 20.95 16 32 16C43.05 16 52 23.85 52 36H12Z"
        stroke="#8F8F8F"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 36H56C58.2 36 60 37.8 60 40C60 42.2 58.2 44 56 44H12C9.8 44 8 42.2 8 40C8 37.8 9.8 36 12 36Z"
        stroke="#8F8F8F"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="14" r="2.5" stroke="#8F8F8F" strokeWidth="2.2" />
    </svg>
  );
}

function HomePage() {
  const trendingProducts = products.slice(0, 8);

  return (
    <Layout>
      <div className="home-gallery-wrapper">
        <Gallery images={homeSlides} width="1440" height="681" />
      </div>

      <div className="home-container">
        <Section title="Coleções em destaque" titleAlign="center">
          <div className="featured-collections">
            {featuredCollections.map((item) => (
              <div key={item.src} className="featured-collection-card">
                <img src={item.src} alt={item.alt} />
                <span className="collection-badge">30% OFF</span>
                <Link to={item.href} className="collection-button">
                  Comprar
                </Link>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Coleções em destaque" titleAlign="center">
          <div className="category-icon-list">
            {categoryIcons.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="category-icon-item"
              >
                <div className="category-icon-circle">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.label}
                      className={item.flipped ? 'icon-flipped' : ''}
                    />
                  ) : (
                    <CapIcon />
                  )}
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </Section>

        <Section
          title="Produtos em alta"
          titleAlign="left"
          link={{ text: 'Ver todos', href: '/produtos' }}
        >
          <ProductListing products={trendingProducts} />
        </Section>
      </div>

      <section className="special-offer">
        <div className="special-offer-container">
          <div className="special-offer-media">
            <div className="special-offer-circle" />
            <img
              src={airJordanOffer}
              alt="Air Jordan edição de colecionador"
              className="special-offer-image"
            />
          </div>

          <div className="special-offer-content">
            <span className="special-offer-tag">Oferta especial</span>
            <h2 className="special-offer-title">
              Air Jordan edição de colecionador
            </h2>
            <p className="special-offer-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip.
            </p>
            <Link to="/product/6" className="special-offer-button">
              Ver Oferta
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default HomePage;
