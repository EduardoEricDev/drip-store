import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
