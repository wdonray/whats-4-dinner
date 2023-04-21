import * as vue from 'vue'
import { doc, setDoc, getFirestore, deleteDoc, getDocs, collection } from 'firebase/firestore'
import { getAuth } from '@firebase/auth'
import FirebaseApp from '../api/firebase'

export default function useDb(dbLocation) {
  const { currentUser } = getAuth()
  if (!currentUser) return
  const db = getFirestore(FirebaseApp)

  const saved = vue.ref(null)
  const items = vue.ref([])
  const fetching = vue.ref(false)

  const path = vue.computed(() => `${currentUser.uid}:${dbLocation}`)

  async function list() {
    fetching.value = true
    const querySnapshot = await getDocs(collection(db, path.value))
    items.value = querySnapshot.size > 0 ? querySnapshot.docs.map((doc) => doc.data()) : []
    fetching.value = false
  }

  async function remove(data) {
    const docRef = doc(db, path.value, data.id)
    await deleteDoc(docRef)
  }

  async function save(data) {
    const docRef = doc(db, path.value, data.id)
    saved.value = await setDoc(docRef, { [data.id]: data }, { merge: true })
  }

  async function bookmarkRecipe(data, callback) {
    fetching.value = true
    const recipes = vue.toRaw(items.value).map((item) => Object.values(item)[0])
    const isBookmarked = recipes.some((item) => item.id === data.id)

    if (isBookmarked) {
      await remove(data)
    } else {
      await save(data)
    }

    const querySnapshot = await getDocs(collection(db, path.value))
    items.value = querySnapshot.size > 0 ? querySnapshot.docs.map((doc) => doc.data()) : []

    fetching.value = false
    callback(!isBookmarked)
    return !isBookmarked
  }

  return { list, saved, items, fetching, bookmarkRecipe }
}
