import React from 'react'
import { useState } from 'react';

const Form = () => {

    const [formData,setFormData] = useState({
        name:"",
        email:""
    })

    const handleChange = (e) =>{
        const { name , value } = e.target
        
            setFormData((prevData)=>(
                {...prevData,[name]:value}
            ))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(formData);
    }

  return (
    <div>
        <h1>Profile App</h1>
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' placeholder='Enter name' onChange={handleChange} id='name' value={formData.name}/>
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" name='email' placeholder='Enter email ID' onChange={handleChange} id='email' value={formData.email}/>
            <br />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Form