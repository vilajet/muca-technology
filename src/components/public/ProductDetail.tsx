import { useState } from 'react'
import { FiX, FiChevronLeft, FiChevronRight, FiPackage } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import type { Product } from '../../services/products'
import { getProductPhotos } from '../../services/products'

interface Props {
  product: Product
  onClose: () => void
}

export default function ProductDetail({ product, onClose }: Props) {
  const photos = getProductPhotos(product)
  const [photoIndex, setPhotoIndex] = useState(0)
  const whatsapp = import.meta.env.VITE_WHATSAPP_NUMBER || ''

  function prev() {
    setPhotoIndex((i) => (i > 0 ? i - 1 : photos.length - 1))
  }

  function next() {
    setPhotoIndex((i) => (i < photos.length - 1 ? i + 1 : 0))
  }

  const whatsappMessage = encodeURIComponent(
    `Përshëndetje! Jam i interesuar për: ${product.name}. A mund të më jepni më shumë informacion?`
  )

  return (
    <div className="modal-overlay product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-detail-close" onClick={onClose}>
          <FiX />
        </button>

        {/* Photo Gallery */}
        <div className="product-detail-gallery">
          {photos.length > 0 ? (
            <>
              <img
                src={photos[photoIndex]}
                alt={product.name}
                className="product-detail-image"
              />
              {photos.length > 1 && (
                <>
                  <button className="gallery-nav gallery-prev" onClick={prev}>
                    <FiChevronLeft />
                  </button>
                  <button className="gallery-nav gallery-next" onClick={next}>
                    <FiChevronRight />
                  </button>
                  <div className="gallery-dots">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        className={`gallery-dot ${i === photoIndex ? 'active' : ''}`}
                        onClick={() => setPhotoIndex(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="product-detail-no-photo">
              <FiPackage size={48} />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          {product.category && (
            <span className="product-detail-category">{product.category}</span>
          )}
          <h2>{product.name}</h2>
          {product.price && (
            <div className="product-detail-price">€{product.price}</div>
          )}
          {product.description && (
            <p className="product-detail-desc">{product.description}</p>
          )}

          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn product-detail-whatsapp"
            >
              <FaWhatsapp size={20} /> Kontakto në WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
