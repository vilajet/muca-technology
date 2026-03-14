import { useEffect, useState } from 'react'
import { getProducts, type Product } from '../../services/products'
import { FiPackage } from 'react-icons/fi'

export default function Services() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Te gjitha')

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.filter((p) => p.visible !== false)))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const categories = ['Te gjitha', ...new Set(products.map((p) => p.category).filter(Boolean))]
  const filtered = activeCategory === 'Te gjitha'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <section className="section" id="sherbimet">
      <div className="container">
        <div className="section-header">
          <div className="accent-line" />
          <h2>Shërbimet & Produktet</h2>
          <p>Zgjidhje të personalizuara teknologjike për çdo nevojë të biznesit tuaj</p>
        </div>

        {categories.length > 1 && (
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat as string)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="loading-spinner"><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon"><FiPackage /></div>
            <p>Nuk ka produkte për momentin.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => (
              <div key={product.id} className="product-card animate-in">
                {product.photoURL ? (
                  <img
                    src={product.photoURL}
                    alt={product.name}
                    className="product-card-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="product-card-placeholder">
                    <FiPackage />
                  </div>
                )}
                <div className="product-card-body">
                  {product.category && (
                    <div className="product-card-category">{product.category}</div>
                  )}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {product.price && (
                    <div className="product-card-price">{product.price} Lek</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
