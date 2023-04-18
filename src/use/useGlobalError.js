import { ref } from 'vue'

const errorMessage = ref('')

function handleError(error) {
  if (error?.code == 'cancelled') return

  if (error?.message) {
    errorMessage.value = error.message

    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  }
}

Promise.prototype.catch = function (_onRejected) {
  return Promise.prototype.then.call(this, undefined, handleError)
}

export default function useGlobalError() {
  return { errorMessage }
}
