import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductViewPage from './pages/ProductViewPage';
import Layout from './pages/Layout';
import Section from './components/Section';
import { featuredCollections } from './data/products';
import { Link } from 'react-router-dom';

function CategoriesPage() {
  const categories = ['Tênis', 'Casual', 'Corrida', 'Esporte e lazer'];

  return (
    <Layout>
      <div style={{ maxWidth: '1240px', margin: '40px auto 64px', padding: '0 24px' }}>
        <Section title="Categorias" titleAlign="left">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {categories.map((category) => (
              <Link
                key={category}
                to={`/produtos?categoria=${encodeURIComponent(category)}`}
                style={{
                  backgroundColor: 'var(--white)',
                  padding: '28px 24px',
                  borderRadius: '4px',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--dark-gray-2)',
                  border: '1px solid var(--light-gray-2)',
                }}
              >
                {category}
              </Link>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {featuredCollections.map((item) => (
              <Link key={item.src} to={item.href}>
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{ width: '100%', borderRadius: '4px' }}
                />
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </Layout>
  );
}

function OrdersPage() {
  return (
    <Layout>
      <div style={{ maxWidth: '1240px', margin: '40px auto 64px', padding: '0 24px' }}>
        <Section
          title="Meus Pedidos"
          titleAlign="left"
          link={{ text: 'Explorar produtos', href: '/produtos' }}
        >
          <div
            style={{
              backgroundColor: 'var(--white)',
              padding: '32px',
              borderRadius: '4px',
              color: 'var(--dark-gray-2)',
              fontSize: '16px',
            }}
          >
            Você ainda não possui pedidos finalizados.
          </div>
        </Section>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos" element={<ProductListingPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductViewPage />} />
        <Route path="/produto/:id" element={<ProductViewPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/meus-pedidos" element={<OrdersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
