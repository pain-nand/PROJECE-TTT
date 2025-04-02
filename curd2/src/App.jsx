import React, { useState } from 'react'
import { v4 as uuid4 } from 'uuid'
const App = () => {
  const [formData, setFormData] = useState({
    _id: uuid4(),
    name: "",
    email: "",
    contactNumber: ""
  })

  const [cancelEdit, setCancelEdit] = useState(false)

  const [users, setUsers] = useState([])
  const handleChange = (e) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ))
  }

  console.log(formData)
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const handleAddUser = () => {
    setUsers((prevUsers) => {
      return [
        ...prevUsers,
        formData
      ]
    })

    setFormData(
      {
        _id: uuid4(),
        name: "",
        email: "",
        contactNumber: ""
      }
    )
  }
  const handleDelete = (userId) => {
    setUsers((prevUsers) => (
      prevUsers.filter((user) => (
        user._id !== userId
      ))
    ))
  }
const handleCancel = () => {
  setCancelEdit(false)
  setFormData(
    {
      _id: uuid4(),
      name: "",
      email: "",
      contactNumber: ""
    }
  )
}
  const handleEditUser = (user) => {
    setFormData(user)
    setCancelEdit(true)
  }

  const handleUpdateUser = () => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        return user._id === formData._id ? formData : user
      })
    })

    handleCancel()
  }
  return (
    <div>
      <form action="" onClick={handleFormSubmit}>
        <input type="text" placeholder='user name' name='name' value={formData.name} onChange={handleChange} /><br />
        <input type="email" placeholder='email' name='email' value={formData.email} onChange={handleChange} /><br />
        <input type="number" placeholder='contact number' value={formData.contactNumber} onChange={handleChange} name='contactNumber' /><br />
        {
          cancelEdit ? (<div>
            <button onClick={handleCancel}>cancel</button>
            <button onClick={handleUpdateUser}>update</button>
          </div>) : (
            <button onClick={handleAddUser}>submit</button>

          )
        }
      </form>

      <div>
        {
          users.map((user, index) => {
            return (
              <div>
                <hr />
                <h1>{user.name}</h1>
                <h1>{user.email}</h1>
                <h1>{user.contactNumber}</h1>
                <button onClick={() => handleDelete(user._id)}>delete</button>
                <button onClick={() => handleEditUser(user)}>edit</button>
                <hr />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App