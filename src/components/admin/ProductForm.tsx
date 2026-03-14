import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import type { Product, ProductFormData } from '../../services/products'

interface Props {
  product?: Product | null
  onSave: (data: ProductFormData) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSave, onCancel }: Props) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    photoURL: '',
    category: '',
  })

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price ? String(product.price) : '',
        photoURL: product.photoURL || '',
        category: product.category || '',
      })
    }
  }, [product])

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave({
      ...form,
      price: form.price ? Number(form.price) : null,
    })
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{product ? 'Ndrysho Produktin' : 'Shto Produkt të Ri'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Emri *</label>
            <input
              name="name"
              className="form-input"
              placeholder="Emri i produktit"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Përshkrimi</label>
            <textarea
              name="description"
              className="form-input"
              placeholder="Përshkrimi i produktit..."
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Çmimi (Lek)</label>
            <input
              name="price"
              type="number"
              className="form-input"
              placeholder="0"
              value={form.price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>URL e Fotos</label>
            <input
              name="photoURL"
              className="form-input"
              placeholder="https://example.com/photo.jpg"
              value={form.photoURL}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Kategoria</label>
            <input
              name="category"
              className="form-input"
              placeholder="p.sh. Shërbim, Produkt, Softuer"
              value={form.category}
              onChange={handleChange}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel}>
              Anulo
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              {product ? 'Ruaj Ndryshimet' : 'Shto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
