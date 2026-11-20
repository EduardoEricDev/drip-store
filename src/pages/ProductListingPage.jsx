import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from './Layout';
import FilterGroup from '../components/FilterGroup';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';
import { products } from '../data/products';
import './ProductListingPage.css';

const brandOptions = [
  { text: 'Adidas', value: 'Adidas' },
  { text: 'Balenciaga', value: 'Balenciaga' },
  { text: 'K-Swiss', value: 'K-Swiss' },
  { text: 'Nike', value: 'Nike' },
  { text: 'Puma', value: 'Puma' },
];

const categoryOptions = [
  { text: 'Esporte e lazer', value: 'Esporte e lazer' },
  { text: 'Casual', value: 'Casual' },
  { text: 'Utilitário', value: 'Utilitário' },
  { text: 'Corrida', value: 'Corrida' },
];

const genderOptions = [
  { text: 'Masculino', value: 'Masculino' },
  { text: 'Feminino', value: 'Feminino' },
  { text: 'Unissex', value: 'Unissex' },
];

const conditionOptions = [
  { text: 'Novo', value: 'Novo' },
  { text: 'Usado', value: 'Usado' },
];

function toggleValue(list, value) {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function getEffectivePrice(product) {
  return product.priceDiscount ?? product.price;
}

function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get('filter') || '').trim();
  const initialCategory = searchParams.get('categoria') || '';

  const [sortOrder, setSortOrder] = useState('relevance');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : []
  );
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();

    const list = products.filter((item) => {
      if (normalizedQuery) {
        const matchText =
          item.name.toLowerCase().includes(normalizedQuery) ||
          item.brand.toLowerCase().includes(normalizedQuery) ||
          item.category.toLowerCase().includes(normalizedQuery);
        if (!matchText) return false;
      }

      if (selectedBrands.length > 0 && !selectedBrands.includes(item.brand)) {
        return false;
      }

      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(item.category)
      ) {
        return false;
      }

      if (
        selectedGenders.length > 0 &&
        !selectedGenders.includes(item.gender)
      ) {
        return false;
      }

      if (selectedCondition && item.condition !== selectedCondition) {
        return false;
      }

      return true;
    });

    if (sortOrder === 'lowest') {
      return [...list].sort(
        (a, b) => getEffectivePrice(a) - getEffectivePrice(b)
      );
    }

    if (sortOrder === 'highest') {
      return [...list].sort(
        (a, b) => getEffectivePrice(b) - getEffectivePrice(a)
      );
    }

    return list;
  }, [
    searchQuery,
    selectedBrands,
    selectedCategories,
    selectedGenders,
    selectedCondition,
    sortOrder,
  ]);

  const sectionTitle = searchQuery
    ? `Resultados para "${searchQuery}" - ${filteredProducts.length} produtos`
    : `${filteredProducts.length} produtos encontrados`;

  return (
    <Layout>
      <div className="listing-page">
        <aside className="listing-sidebar">
          <div className="sort-box">
            <label htmlFor="sort-select" className="sort-label">
              Ordenar por
            </label>
            <select
              id="sort-select"
              className="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="relevance">Mais relevantes</option>
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
            </select>
          </div>

          <div className="filter-box">
            <div className="filter-box-header">
              <h3 className="filter-box-title">Filtrar por</h3>
              {(selectedBrands.length > 0 ||
                selectedCategories.length > 0 ||
                selectedGenders.length > 0 ||
                selectedCondition) && (
                <button
                  type="button"
                  className="filter-clear-btn"
                  onClick={() => {
                    setSelectedBrands([]);
                    setSelectedCategories([]);
                    setSelectedGenders([]);
                    setSelectedCondition('');
                  }}
                >
                  Limpar
                </button>
              )}
            </div>

            <hr className="filter-divider" />

            <div className="filter-groups">
              <FilterGroup
                title="Marca"
                inputType="checkbox"
                options={brandOptions}
                selectedValues={selectedBrands}
                onChange={(val) =>
                  setSelectedBrands((prev) => toggleValue(prev, val))
                }
              />

              <FilterGroup
                title="Categoria"
                inputType="checkbox"
                options={categoryOptions}
                selectedValues={selectedCategories}
                onChange={(val) =>
                  setSelectedCategories((prev) => toggleValue(prev, val))
                }
              />

              <FilterGroup
                title="Gênero"
                inputType="checkbox"
                options={genderOptions}
                selectedValues={selectedGenders}
                onChange={(val) =>
                  setSelectedGenders((prev) => toggleValue(prev, val))
                }
              />

              <FilterGroup
                title="Estado"
                inputType="radio"
                name="product-condition"
                options={conditionOptions}
                selectedValues={selectedCondition}
                onChange={(val) => setSelectedCondition(val)}
              />
            </div>
          </div>
        </aside>

        <div className="listing-content">
          <Section title={sectionTitle} titleAlign="left">
            {filteredProducts.length > 0 ? (
              <ProductListing products={filteredProducts} />
            ) : (
              <p className="listing-empty">
                Nenhum produto encontrado com os filtros selecionados.
              </p>
            )}
          </Section>
        </div>
      </div>
    </Layout>
  );
}

export default ProductListingPage;
