import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from './Layout';
import Gallery from '../components/Gallery';
import BuyBox from '../components/BuyBox';
import ProductOptions from '../components/ProductOptions';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';
import { products } from '../data/products';
import './ProductViewPage.css';

function ProductViewPage() {
  const { id } = useParams();
  const product =
    products.find((item) => String(item.id) === String(id)) || products[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    window.scrollTo(0, 0);
  }, [product]);

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="product-view-container">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/produtos">Produtos</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-view-main">
          <Gallery
            className="product-view-gallery"
            images={product.images}
            showThumbs
            width="700px"
            height="570px"
            radius="4px"
          />

          <div className="product-view-buybox">
            <BuyBox
              name={product.name}
              category={product.category}
              brand={product.brand}
              reference={product.reference}
              stars={product.stars}
              rating={product.rating}
              price={product.price}
              priceDiscount={product.priceDiscount}
              description={product.description}
            >
              <ProductOptions
                title="Tamanho"
                options={product.sizes}
                radius="4px"
                shape="square"
                type="text"
                selected={selectedSize}
                onChange={setSelectedSize}
              />

              <ProductOptions
                title="Cor"
                options={product.colors}
                shape="circle"
                type="color"
                selected={selectedColor}
                onChange={setSelectedColor}
              />
            </BuyBox>
          </div>
        </div>

        <Section
          title="Produtos recomendados"
          titleAlign="left"
          link={{ text: 'Ver todos', href: '/products' }}
        >
          <ProductListing products={relatedProducts} />
        </Section>
      </div>
    </Layout>
  );
}

export default ProductViewPage;
