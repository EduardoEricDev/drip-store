import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import miniCartIcon from '../../assets/mini-cart.svg';
import './Header.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    const query = searchTerm.trim();
    if (query) {
      navigate(`/products?filter=${encodeURIComponent(query)}`);
    } else {
      navigate('/products');
    }
  }

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-top">
          <Link to="/" aria-label="Página inicial Digital Store">
            <Logo />
          </Link>

          <form className="header-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Pesquisar produto"
            />
            <button type="submit" aria-label="Buscar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#8F8F8F" strokeWidth="2" />
                <path
                  d="M20 20L16.2 16.2"
                  stroke="#8F8F8F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>

          <div className="header-actions">
            <Link to="/cadastro" className="header-register">
              Cadastre-se
            </Link>
            <Link to="/login" className="header-login">
              Entrar
            </Link>
            <div className="header-cart" aria-label="Carrinho de compras">
              <img src={miniCartIcon} alt="Carrinho" width={20} height={21} />
              <span className="cart-badge">2</span>
            </div>
          </div>
        </div>

        <nav className="header-nav" aria-label="Navegação principal">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/produtos">Produtos</NavLink>
          <NavLink to="/categorias">Categorias</NavLink>
          <NavLink to="/meus-pedidos">Meus Pedidos</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
