import starIcon from '../../assets/star-icon.svg';
import { formatPrice } from '../../data/products';
import './BuyBox.css';

function BuyBox({
  name,
  category,
  brand,
  reference,
  stars = 0,
  rating,
  price,
  priceDiscount,
  description,
  children,
  onBuy,
}) {
  const fullStars = Math.round(Number(stars));
  const metaParts = [category, brand, reference ? `REF:${reference}` : ''].filter(Boolean);

  return (
    <div className="buy-box">
      <h1 className="buy-box-name">{name}</h1>
      <span className="buy-box-reference">{metaParts.join(' | ')}</span>

      <div className="buy-box-rating-row">
        <div className="buy-box-star-list" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={`buy-box-star-dot ${index <= fullStars ? 'is-filled' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="buy-box-stars">
          {stars}
          <img
            src={starIcon}
            alt=""
            className="buy-box-star-icon"
            width={14}
            height={14}
          />
        </span>
        <span className="buy-box-rating">({rating} avaliações)</span>
      </div>

      <div className="buy-box-prices">
        {priceDiscount ? (
          <>
            <span className="buy-box-price-current">
              {formatPrice(priceDiscount)}
            </span>
            <span className="buy-box-price-old">{formatPrice(price)}</span>
          </>
        ) : (
          <span className="buy-box-price-current">{formatPrice(price)}</span>
        )}
      </div>

      <div className="buy-box-description-block">
        <span className="buy-box-label">Descrição do produto</span>
        <p className="buy-box-description">{description}</p>
      </div>

      {children && <div className="buy-box-options">{children}</div>}

      <button type="button" className="buy-box-cta" onClick={onBuy}>
        COMPRAR
      </button>
    </div>
  );
}

export default BuyBox;
