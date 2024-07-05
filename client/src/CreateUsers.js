import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CreateUsers = () => {
    let { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => {
            if(id){
                let res = result.data;
                setName(res.name);
                setEmail(res.email);
                setAge(res.age);
            }
        })
        .catch(err => console.log(err))
    },[])

    const submit = (e) => {
        e.preventDefault();
        if(id){
            axios.put('http://localhost:3001/updateUser/'+id, {name, email, age})
            .then(result => {
                alert('Form Updated Successfully');
                setName('');
                setEmail('')
                setAge('');
                navigate('/')
            })
            .catch(err => console.log(err))
        }else{
            axios.post('http://localhost:3001/createUser', {name, email, age})
            .then(result => {
                alert('Form Submitted Successfully');
                setName('');
                setEmail('')
                setAge('');
                navigate('/')
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-item-center' style={{alignItems: 'center'}}>
            <div className='w-50 bg-white rounded p-3' style={{height: 'fit-content'}}>
                <form onSubmit={submit}>
                    <h2>{id? 'Update': 'Add'} User</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' className='form-control' placeholder='Enter your Name' 
                            value={name} onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email ID:</label>
                        <input type='email' name='email' className='form-control' placeholder='Enter your Email ID'
                            value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='age'>Age:</label>
                        <input type='number' name='age' className='form-control' placeholder='Enter your Age'
                            value={age} onChange={(e)=>setAge(e.target.value)} />
                    </div>
                    <button className='btn btn-success' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUsers