import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import LeftNav from '../Navbar/LeftNav'
import axios from 'axios'
import './Admin.css'

const Admin = () => {

    const [allUser, setAllUser] = useState([])
    // const [name, setName] = useState(user.name)

    
    useEffect(()=> {
        const fetchh = async () => {
            const res = await axios.get("/users/allusers")
            setAllUser(res.data)
            console.log(res.data)
        }
        fetchh();
    },[])

    // let res1;
    // const handleEdit = async (userId,name,role) => {
    //     console.log(userId)
    //     res1 = await axios.post(`/users/find/${userId}`,{name,role},
    //     {
    //         headers:{
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     console.log(res1.data)
    // }


    // const handleEdit = async (userId) => {
    //     try {
    //       // Find the user to edit
    //       const user = allUser.find((u) => u._id === userId);
    
    //       // Show the edit form
    //       const newNameInput = document.getElementById(`newNameInput-${userId}`);
    //       newNameInput.value = user.name;
    //       newNameInput.style.display = "inline-block";
    //       const editButton = document.getElementById(`editButton-${userId}`);
    //       editButton.style.display = "none";
    
    //       // Wait for the user to submit the form
    //       const newName = await new Promise((resolve) => {
    //         newNameInput.addEventListener("keydown", (e) => {
    //           if (e.keyCode === 13) {
    //             resolve(newNameInput.value);
    //           }
    //         });
    //       });
    
    //       // Send a PUT request to update the user name
    //       await axios.put(`/users/update/${userId}`, { name: newName });
    
    //       // Refresh the user list
    //       const res2 = await axios.get("/users/allusers");
    //       setAllUser(res2.data);
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   };


    const handleEdit = async (userId) => {
        const res = await axios.get(`/users/find/${userId}`)
        const user = res.data
        const name = prompt('Enter new name', user.name)
        if (name) {
          const email = prompt('Enter new email', user.email)
          if (email) {
            const role = prompt('Enter new role', user.role)
            if (role) {
              try {
                const res = await axios.put(`/users/update/${userId}`, {
                  name,
                  email,
                  role,
                })
                const updatedUser = res.data
                setAllUser((prevUsers) =>
                  prevUsers.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                  )
                )
              } catch (err) {
                console.log(err)
              }
            }
          }
        }
      }


    return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
            <LeftNav/>
        </div>


        <div style={{'margin':200}}>
            <table className='adminTable'>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>edit</th>
                    </tr>
                </thead>
                {/* <tbody>
                {allUser && allUser.map((user)=>(
                    <>
                    <tr>
                        <td>{user.role}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><button onClick={() => handleEdit(user._id)}>edit</button></td>
                    </tr>
                </>

            ))}
                </tbody> */}

{/* <tbody>
            {allUser &&
              allUser.map((user) => (
                <tr key={user._id}>
                  <td>{user.role}</td>
                  <td>
                    <input
                      id={`newNameInput-${user._id}`}
                      style={{ display: "none" }}
                    />
                    <span>{user.name}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      id={`editButton-${user._id}`}
                      onClick={() => handleEdit(user._id)}
                    >
                      edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody> */}


<tbody>
            {allUser &&
              allUser.map((user) => (
                <tr key={user._id}>
                  {/* <td>{user.role}</td> */}
                  <td>
                    <input type="text" defaultValue={user.name} />
                  </td>
                  <td>
                    <input type="text" defaultValue={user.email} />
                  </td>
                  <td>
                    <input type="text" defaultValue={user.role} />
                  </td>
                  <td>
                    <button onClick={() => handleEdit(user._id)}>Save</button>
                  </td>
                </tr>
              ))}
          </tbody>
            </table>

            {/* <form>
                <input type='text' placeholder='name' value={name} onChange={} />
            </form> */}
        </div>
    </div>
  )
}

export default Admin