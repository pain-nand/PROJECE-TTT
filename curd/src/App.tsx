import { useState } from "react"
import {v4 as uuidv4} from "uuid"
const App = () => {
  const [formData, setFromData] = useState({
    _id: uuidv4(),
    name: "",
    contactNumber: "",
    email: ""
  })

  const [users, setUsers] = useState([])

  const handleUserChange = (e: string) => {
    setFromData((prevData: object) => {
      return { ...prevData, [e.target.name]: e.target.value }
    })

  }
  const handleAddUserData = (e: any) => {
    setUsers((prevUser: object) => (
      [
        ...prevUser,
        formData
      ]
    ))

  }

const handleDelete = (userId:any) => {
  setUsers((prevUsers:array) => {
    return prevUsers.filter((user:object) => {
      return user._id !== userId
    })
  })

}

console.log(users)
  return (
    <>
      <div>
        <input type="text" name="name" id="" placeholder="userName" onChange={handleUserChange} /> <br />
        <input type="number" name="contactNumber" id="" placeholder="contactNumber" onChange={handleUserChange} /> <br />
        <input type="email" name="email" id="" placeholder="email" onChange={handleUserChange} /> <br />
        <button onClick={handleAddUserData}>submit</button>
      </div>
<div>
  {
    users.map((user:object) => {
      return (
        <div key={user._id}>
          <h1>
            {user.name}
          </h1>
          <h1>
            {user.contactNumber}
          </h1>
          <h1>
            {user.email}
          </h1>

          <div>
            <button onClick={() => handleDelete(user._id)}>delete</button>
            <button>edit</button>
          </div>
        </div>
      )
    })
  }
</div>

    </>
  )
}

export default App