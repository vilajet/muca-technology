import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase'

const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function uploadProductImage(file: File, productId: string): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Formati i fotos nuk lejohet. Përdorni JPG, PNG ose WebP.')
  }
  if (file.size > MAX_SIZE) {
    throw new Error('Foto është shumë e madhe. Maksimumi është 5MB.')
  }

  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const path = `products/${productId}/${timestamp}_${safeName}`
  const storageRef = ref(storage, path)

  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

export async function deleteProductImage(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url)
    await deleteObject(storageRef)
  } catch (err) {
    console.warn('Could not delete image from storage:', err)
  }
}
