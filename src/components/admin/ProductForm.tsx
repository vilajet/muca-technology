import { useState, useEffect, useRef, type FormEvent, type ChangeEvent, type DragEvent } from 'react'
import { FiUpload, FiX, FiImage } from 'react-icons/fi'
import type { Product, ProductFormData } from '../../services/products'
import { getProductPhotos } from '../../services/products'
import { uploadProductImage, deleteProductImage } from '../../services/storage'

const MAX_PHOTOS = 5

const CATEGORIES = [
  'Kamera Sigurie',
  'Sisteme Alarmi',
  'Instalime Elektrike',
  'Internet & TV',
]

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
    category: '',
  })
  const [existingPhotos, setExistingPhotos] = useState<string[]>([])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [removedPhotos, setRemovedPhotos] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price ? String(product.price) : '',
        category: product.category || '',
      })
      setExistingPhotos(getProductPhotos(product))
    }
  }, [product])

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const totalPhotos = existingPhotos.length - removedPhotos.length + newFiles.length
  const canAddMore = totalPhotos < MAX_PHOTOS

  function addFiles(files: FileList | File[]) {
    const fileArr = Array.from(files).filter(
      (f) => f.type.startsWith('image/') && f.size <= 5 * 1024 * 1024
    )
    const slots = MAX_PHOTOS - totalPhotos
    if (slots <= 0) return
    setNewFiles((prev) => [...prev, ...fileArr.slice(0, slots)])
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(e.target.files)
    e.target.value = ''
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files)
  }

  function removeExisting(url: string) {
    setRemovedPhotos((prev) => [...prev, url])
  }

  function removeNew(index: number) {
    setNewFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    setError('')
    setUploading(true)

    try {
      // Delete removed photos from storage
      for (const url of removedPhotos) {
        await deleteProductImage(url)
      }

      // Upload new files
      const productId = product?.id || `temp_${Date.now()}`
      const uploadedUrls: string[] = []
      for (const file of newFiles) {
        const url = await uploadProductImage(file, productId)
        uploadedUrls.push(url)
      }

      // Combine existing (minus removed) + newly uploaded
      const finalPhotos = [
        ...existingPhotos.filter((url) => !removedPhotos.includes(url)),
        ...uploadedUrls,
      ]

      onSave({
        ...form,
        price: form.price ? Number(form.price) : null,
        photos: finalPhotos,
        photoURL: finalPhotos[0] || '',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gabim gjatë ngarkimit të fotos.')
      setUploading(false)
    }
  }

  const keptExisting = existingPhotos.filter((url) => !removedPhotos.includes(url))

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{product ? 'Ndrysho Produktin' : 'Shto Produkt të Ri'}</h3>

        {error && <div className="error-message">{error}</div>}

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
          <div className="form-row">
            <div className="form-group">
              <label>Çmimi (€)</label>
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
              <label>Kategoria</label>
              <select
                name="category"
                className="form-input"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Zgjidh kategorinë...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="form-group">
            <label>Fotot ({totalPhotos}/{MAX_PHOTOS})</label>

            {/* Preview grid */}
            {(keptExisting.length > 0 || newFiles.length > 0) && (
              <div className="photo-preview-grid">
                {keptExisting.map((url) => (
                  <div key={url} className="photo-preview-item">
                    <img src={url} alt="" />
                    <button
                      type="button"
                      className="photo-remove-btn"
                      onClick={() => removeExisting(url)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
                {newFiles.map((file, i) => (
                  <div key={i} className="photo-preview-item">
                    <img src={URL.createObjectURL(file)} alt="" />
                    <button
                      type="button"
                      className="photo-remove-btn"
                      onClick={() => removeNew(i)}
                    >
                      <FiX />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Drop zone */}
            {canAddMore && (
              <div
                className={`photo-dropzone ${dragOver ? 'drag-over' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <FiUpload size={24} />
                <span>Kliko ose tërhiq fotot këtu</span>
                <span className="hint">JPG, PNG, WebP — max 5MB</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel} disabled={uploading}>
              Anulo
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={uploading}>
              {uploading ? (
                <><FiImage className="spin" /> Duke ngarkuar...</>
              ) : (
                product ? 'Ruaj Ndryshimet' : 'Shto'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
