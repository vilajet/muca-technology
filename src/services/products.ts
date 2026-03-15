import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'
import { db } from './firebase'

const COLLECTION = 'products'

export interface Product {
  id: string
  name: string
  description?: string
  price?: number | null
  photoURL?: string
  photos?: string[]
  category?: string
  order: number
  visible: boolean
  createdAt?: string
}

/** Helper: get photos array with backward compat for old photoURL field */
export function getProductPhotos(product: Product): string[] {
  if (product.photos && product.photos.length > 0) return product.photos
  if (product.photoURL) return [product.photoURL]
  return []
}

export type ProductFormData = Omit<Product, 'id' | 'order' | 'visible' | 'createdAt'>

export async function getProducts(): Promise<Product[]> {
  const q = query(collection(db, COLLECTION), orderBy('order', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product))
}

export async function addProduct(product: ProductFormData): Promise<void> {
  const products = await getProducts()
  const maxOrder = products.length > 0 ? Math.max(...products.map((p) => p.order || 0)) : -1
  await addDoc(collection(db, COLLECTION), {
    ...product,
    order: maxOrder + 1,
    visible: true,
    createdAt: new Date().toISOString(),
  })
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  const ref = doc(db, COLLECTION, id)
  await updateDoc(ref, data)
}

export async function deleteProduct(id: string): Promise<void> {
  const ref = doc(db, COLLECTION, id)
  await deleteDoc(ref)
}

export async function swapProductOrder(products: Product[], indexA: number, indexB: number): Promise<void> {
  const orderA = products[indexA].order
  const orderB = products[indexB].order
  await updateProduct(products[indexA].id, { order: orderB })
  await updateProduct(products[indexB].id, { order: orderA })
}
