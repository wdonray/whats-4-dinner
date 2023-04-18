import { ref } from 'vue'

export default function (url) {
  const options = {}
  const data = ref(null)
  const error = ref('')
  const fetching = ref(false)

  function get() {
    return execute('GET')
  }

  function post(payload) {
    return execute('POST', payload)
  }

  async function execute(method = 'GET', payload = null) {
    if (method === 'GET') options.mode = 'no-cors'

    options.method = method
    options.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_CHAT_GPT_API}`
    }

    if (payload) options.body = JSON.stringify(payload)

    fetching.value = true

    const response = await fetch(import.meta.env.VITE_BASE_URL + url, options).catch((err) => {
      error.value = err
    })

    if (!response) return

    if (response.ok) {
      error.value = null

      const responseData = await response
        .text()
        .then((text) => (text.length ? JSON.parse(text) : {}))
        .catch((err) => {
          err.value = err
        })

      if (responseData) {
        data.value = responseData
      } else {
        data.value = null
        error.value = response.statusText
      }

      fetching.value = false

      return new Promise((resolve) => {
        if (response.ok || response.status === 401) resolve(response)
      })
    }
  }

  return { data, error, fetching, get, post }
}
