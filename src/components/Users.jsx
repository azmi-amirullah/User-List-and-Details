import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUsers } from '../store/users/usersSlice'

const Users = () => {
  const [Search, setSearch] = useState('')
  const [TotalMatch, setTotalMatch] = useState(false)

  const usersData = useSelector(selectUsers)

  const navigate = useNavigate()

  const mapData = data => {
    const id = `${data.id.name}-${data.id.value}`

    return {
      id,
      title: data.name.title,
      firstName: data.name.first,
      lastName: data.name.last,
      gender: data.gender,
      email: data.email,
      streetName: data.location.street.name,
      streetNumber: data.location.street.number,
      city: data.location.city,
      state: data.location.state,
      country: data.location.country,
      postcode: data.location.postcode
    }
  }

  const mapUsers = usersData.map(value => mapData(value))

  function filterUser(arr, searchKey) {
    return arr.filter(obj =>
      Object.keys(obj).some(key => {
        if (key === 'id') {
          return false
        }
        return TotalMatch && Search !== ''
          ? obj[key].toString().toLowerCase() ===
              searchKey.toString().toLowerCase()
          : obj[key]
              .toString()
              .toLowerCase()
              .includes(searchKey.toString().toLowerCase())
      })
    )
  }

  const filteredUsers = filterUser(mapUsers, Search)

  const Navigate = id => {
    navigate(`user/${id}`)
  }

  return (
    <div className="container">
      <h1 className="my-3 border-bottom border-primary border-2">Users</h1>
      <div className="px-3">
        <div className="d-flex gap-2 pb-1">
          <input
            className="form-control w-50"
            type="search"
            placeholder="Search"
            value={Search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="form-check pb-2">
          <input
            className="form-check-input"
            type="checkbox"
            value={TotalMatch}
            id="checkbox"
            onChange={e => setTotalMatch(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="checkbox">
            Total Match
          </label>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="w-50px">#</th>
                <th>Name</th>
                <th className="w-125px">Gender</th>
                <th>Email</th>
                <th>Location</th>
                <th className="w-125px">Post Code</th>
              </tr>
            </thead>
            <tbody key={filteredUsers.length}>
              {filteredUsers.map((value, index) => {
                const name = `${value.title} ${value.firstName} ${value.lastName}`
                const address = `${value.streetName} No.${value.streetNumber}, 
                  ${value.city}, ${value.state}, ${value.country}`
                return (
                  <tr
                    className="cursor-pointer"
                    key={index}
                    title={value.id}
                    onClick={() => Navigate(value.id)}
                  >
                    <th>{index + 1}</th>
                    <td title={name}>{name}</td>
                    <td className="text-capitalize">{value.gender}</td>
                    <td className="text-truncate" title={value.email}>
                      {value.email}
                    </td>
                    <td className="text-truncate" title={address}>
                      {address}
                    </td>
                    <td>{value.postcode}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users
