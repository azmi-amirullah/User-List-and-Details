import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Users from './components/Users'
import './styles/style.css'
import { getUsers } from './api/api'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers, addUsers } from './store/users/usersSlice'
import UserDetails from './components/UserDetails'

function App() {
  const UsersData = useSelector(selectUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    const filterUsers = response => {
      let filteredUsers = []

      const isDuplicate = id => {
        const userId = [...UsersData, ...filteredUsers].map(
          val => `${val.id.name}-${val.id.value}`
        )
        return userId.includes(`${id.name}-${id.value}`)
      }

      response.results.forEach(value => {
        if (!isDuplicate(value.id)) {
          filteredUsers.push(value)
        }
      })

      return filteredUsers
    }

    if (UsersData.length === 0) {
      getUsers().then(response => {
        dispatch(addUsers(filterUsers(response)))
      })
    }

    if (UsersData.length > 0) {
      setTimeout(() => {
        getUsers().then(response => {
          dispatch(addUsers(filterUsers(response)))
        })
      }, 10000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UsersData])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="user/:id" element={<UserDetails />} />
      </Routes>
    </>
  )
}

export default App
