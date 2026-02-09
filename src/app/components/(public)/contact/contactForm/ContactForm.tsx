'use client'
import React, { useState } from 'react'

function ContactForm() {
    const [contactinfo,setinfo]=useState({name:'',email:'',msg:''})
    const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        alert('yes')
    }
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder='Name' type='text' value={contactinfo.name} onChange={(e)=>{setinfo({...contactinfo,name:e.target.value})}}/>
            <input placeholder='Email' type='email' value={contactinfo.email} onChange={(e)=>{setinfo({...contactinfo,email:e.target.value})}}/>
            <input placeholder='Message' type='text' value={contactinfo.msg} onChange={(e)=>{setinfo({...contactinfo,msg:e.target.value})}}/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default ContactForm