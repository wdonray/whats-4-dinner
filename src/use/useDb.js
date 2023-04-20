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

  async function save(data) {
    await execute(async () => {
      const docRef = doc(db, path.value, data.id)
      const set = await setDoc(docRef, { [data.id]: data }, { merge: true })
      saved.value = set
    })
  }

  async function list() {
    await execute(async () => {
      const querySnapshot = await getDocs(collection(db, path.value))
      items.value = querySnapshot.size > 0 ? querySnapshot.docs.map((doc) => doc.data()) : []
    })
  }

  async function remove(data) {
    await execute(async () => {
      const docRef = doc(db, path.value, data.id)
      await deleteDoc(docRef)
    })
  }

  async function bookmarkRecipe(data, callback) {
    const recipes = vue.toRaw(items.value).map((item) => Object.values(item)[0])
    const isBookmarked = recipes.some((item) => item.id === data.id)

    if (isBookmarked) {
      await remove(data)
    } else {
      await save(data)
    }

    await list()

    callback(!isBookmarked)

    return !isBookmarked
  }

  async function execute(callback) {
    fetching.value = true

    await callback()

    fetching.value = false
  }

  return { save, list, saved, items, fetching, bookmarkRecipe }
}
