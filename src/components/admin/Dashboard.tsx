import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { getProducts, addProduct, updateProduct, deleteProduct, swapProductOrder, getProductPhotos, type Product, type ProductFormData } from '../../services/products'
import ProductForm from './ProductForm'
import {
  FiPlus, FiEdit2, FiTrash2, FiArrowUp, FiArrowDown,
  FiEye, FiEyeOff, FiLogOut, FiHome, FiPackage,
} from 'react-icons/fi'

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  async function handleAdd(data: ProductFormData) {
    await addProduct(data)
    setShowForm(false)
    loadProducts()
  }

  async function handleEdit(data: ProductFormData) {
    if (!editingProduct) return
    await updateProduct(editingProduct.id, data)
    setEditingProduct(null)
    loadProducts()
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Jeni të sigurt që doni ta fshini këtë produkt?')) return
    await deleteProduct(id)
    loadProducts()
  }

  async function handleToggleVisibility(product: Product) {
    await updateProduct(product.id, { visible: !product.visible })
    loadProducts()
  }

  async function handleMoveUp(index: number) {
    if (index === 0) return
    await swapProductOrder(products, index, index - 1)
    loadProducts()
  }

  async function handleMoveDown(index: number) {
    if (index === products.length - 1) return
    await swapProductOrder(products, index, index + 1)
    loadProducts()
  }

  async function handleLogout() {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <h2>
          <span className="logo-small">M</span>
          Admin Panel
        </h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="icon-btn" onClick={() => navigate('/')} title="Faqja Kryesore">
            <FiHome />
          </button>
          <button className="icon-btn danger" onClick={handleLogout} title="Dil">
            <FiLogOut />
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-toolbar">
          <h3>Produktet ({products.length})</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}>
            <FiPlus /> Shto Produkt
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner"><div className="spinner" /></div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="icon"><FiPackage /></div>
            <p>Nuk keni asnjë produkt. Shtoni produktin e parë!</p>
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={product.id}
              className={`admin-product-item ${product.visible === false ? 'hidden-product' : ''}`}
            >
              {getProductPhotos(product).length > 0 ? (
                <img src={getProductPhotos(product)[0]} alt={product.name} className="admin-product-thumb" />
              ) : (
                <div className="admin-product-thumb" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', fontSize: '1.5rem'
                }}>
                  <FiPackage />
                </div>
              )}
              <div className="admin-product-info">
                <h4>
                  {product.name}
                  {product.visible === false && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: 8 }}>
                      (i fshehur)
                    </span>
                  )}
                </h4>
                <div className="meta">
                  {product.category && <span>{product.category} · </span>}
                  {product.price && <span>€{product.price}</span>}
                </div>
              </div>
              <div className="admin-product-actions">
                <button className="icon-btn" onClick={() => handleMoveUp(index)} title="Lart" disabled={index === 0}>
                  <FiArrowUp />
                </button>
                <button className="icon-btn" onClick={() => handleMoveDown(index)} title="Poshtë" disabled={index === products.length - 1}>
                  <FiArrowDown />
                </button>
                <button
                  className="icon-btn success"
                  onClick={() => handleToggleVisibility(product)}
                  title={product.visible === false ? 'Shfaq' : 'Fshih'}
                >
                  {product.visible === false ? <FiEyeOff /> : <FiEye />}
                </button>
                <button className="icon-btn" onClick={() => setEditingProduct(product)} title="Ndrysho">
                  <FiEdit2 />
                </button>
                <button className="icon-btn danger" onClick={() => handleDelete(product.id)} title="Fshi">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <ProductForm onSave={handleAdd} onCancel={() => setShowForm(false)} />
      )}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={handleEdit}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  )
}
