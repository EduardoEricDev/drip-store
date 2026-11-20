import { Link } from 'react-router-dom';
import { formatPrice } from '../../data/products';
import './ProductCard.css';

function ProductCard({ id, image, imagem, name, category, price, priceDiscount }) {
  const src = image || imagem;
  const discountPercent =
    priceDiscount && price > priceDiscount
      ? Math.round(((price - priceDiscount) / price) * 100)
      : 0;

  const content = (
    <>
      <div className="product-card-image">
        {discountPercent > 0 && (
          <span className="product-card-badge">{discountPercent}% OFF</span>
        )}
        <img src={src} alt={name} />
      </div>

      <div className="product-card-info">
        {category && <span className="product-card-category">{category}</span>}
        <h3 className="product-card-name">{name}</h3>

        <div className="product-card-prices">
          {priceDiscount ? (
            <>
              <span className="product-card-price-old">
                {formatPrice(price)}
              </span>
              <span className="product-card-price">
                {formatPrice(priceDiscount)}
              </span>
            </>
          ) : (
            <span className="product-card-price">{formatPrice(price)}</span>
          )}
        </div>
      </div>
    </>
  );

  if (id) {
    return (
      <Link to={`/product/${id}`} className="product-card">
        {content}
      </Link>
    );
  }

  return <article className="product-card">{content}</article>;
}

export default ProductCard;
