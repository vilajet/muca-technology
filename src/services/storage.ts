const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Formati i fotos nuk lejohet. Përdorni JPG, PNG ose WebP.')
  }
  if (file.size > MAX_SIZE) {
    throw new Error('Foto është shumë e madhe. Maksimumi është 5MB.')
  }

  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', UPLOAD_PRESET)
  body.append('folder', `products/${productId}`)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body,
  })
  if (!res.ok) {
    throw new Error('Gabim gjatë ngarkimit të fotos.')
  }
  const data = await res.json()
  return data.secure_url
}

// Deleting from Cloudinary requires the API secret, which can't be exposed in the
// browser. Removed photos are simply dropped from the product; the file stays in Cloudinary.
export async function deleteProductImage(_url: string): Promise<void> {}
