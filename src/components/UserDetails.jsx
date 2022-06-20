import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { selectUsers } from '../store/users/usersSlice'

const UserDetails = () => {
  const UsersData = useSelector(selectUsers)
  const params = useParams()
  const navigate = useNavigate()
  const user = UsersData.find(x => `${x.id.name}-${x.id.value}` === params.id)

  useEffect(() => {
    if (user === undefined) {
      alert('User Not Found')
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const name = `${user?.name.first} ${user?.name.last}`
  const address = `${user?.location.street.name} No.${user?.location.street.number}, 
    ${user?.location.city}, ${user?.location.state} ${user?.location.postcode}`

  return user ? (
    <div className="container">
      <div className="d-flex py-3 gap-3">
        <div className="d-flex flex-column align-items-center w-50 border border-4">
          <img
            className="my-3 rounded-circle"
            src={user.picture.large}
            alt="pict"
          />
          <div className="p d-flex flex-column align-items-center text-center">
            <h1 className="mb-0">{name}</h1>
            <label className="mb-2">{`@${user.login.username}`}</label>
            <label>{address}</label>
            <label>{user.location.country}</label>
          </div>
        </div>
        <div className="w-100 p-3 d-flex flex-column border border-4">
          <div className="d-flex">
            <div className="w-25">First Name</div>
            <label>: {user.name.first}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Last Name</div>
            <label>: {user.name.last}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Title</div>
            <label>: {user.name.title}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Gender</div>
            <label className="text-capitalize">: {user.gender}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Date of birth</div>
            <label>: {moment(user.dob.date).format('LLLL')}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Nationality</div>
            <label className="text-capitalize">: {user.nat}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Address</div>
            <label className="text-capitalize">
              :
              {` ${user.location.street.name} No.${user.location.street.number}`}
            </label>
          </div>
          <div className="d-flex">
            <div className="w-25">City</div>
            <label>: {user.location.city}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">State</div>
            <label>: {user.location.state}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Post Code</div>
            <label>: {user.location.postcode}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Phone</div>
            <label>: {user.phone}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Cell</div>
            <label>: {user.cell}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Email</div>
            <label>: {user.email}</label>
          </div>
          <div className="d-flex">
            <div className="w-25">Registered</div>
            <label>: {moment(user.registered.date).format('LLLL')}</label>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div />
  )
}

export default UserDetails
