import { useEffect, useState } from 'react'
import { getProducts, getProductPhotos, type Product } from '../../services/products'
import { FiPackage } from 'react-icons/fi'
import ProductDetail from './ProductDetail'

export default function Services() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Te gjitha')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 10000)
    )
    Promise.race([getProducts(), timeout])
      .then((data) => setProducts((data as Product[]).filter((p) => p.visible !== false)))
      .catch((err) => {
        console.error(err)
        setError(true)
      })
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
          <p>Kamera sigurie, sisteme alarmi, instalime elektrike, internet dhe TV</p>
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
        ) : error ? (
          <div className="empty-state">
            <div className="icon"><FiPackage /></div>
            <p>Nuk mund të ngarkohen produktet. Ju lutemi provoni përsëri.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon"><FiPackage /></div>
            <p>Nuk ka produkte për momentin.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => {
              const photos = getProductPhotos(product)
              return (
                <div
                  key={product.id}
                  className="product-card animate-in clickable"
                  onClick={() => setSelectedProduct(product)}
                >
                  {photos.length > 0 ? (
                    <img
                      src={photos[0]}
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
                      <div className="product-card-price">€{product.price}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  )
}
