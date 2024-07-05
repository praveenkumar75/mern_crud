import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3001/')
        .then(result => {
            setUsers(result.data)
        })
        .catch(err => console.log(err))
    },[])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(result => {
            alert('User Deleted Successfully');
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-item-center' style={{alignItems: 'center'}}>
            <div className='w-50 bg-white rounded p-3' style={{height: 'fit-content'}}>
                <Link to={'/create'} className='btn btn-primary' style={{float: 'right'}}>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user)=>{
                                return (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>
                                            <Link to={`/update/${user._id}`} className='btn btn-dark btn-new-design'>Edit</Link> &nbsp;
                                            <button onClick={(e)=>handleDelete(user._id)} className='btn btn-danger btn-new-design'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users