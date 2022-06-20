export const getUsers = () => {
  return fetch('https://randomuser.me/api/?results=20').then(response => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response)
  })
}
