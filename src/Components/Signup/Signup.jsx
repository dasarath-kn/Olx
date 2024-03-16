import React, { useContext, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore';
 import {auth,firestore} from '../../firebase/config';

import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate()
  let[username,setUsername]=useState('')
  let[email,setEmail]=useState('')
  let[phonenumber,setPhonenumber]=useState('')
  let[password,setPassword]=useState('')
  let [err,setErr]=useState(null)
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handlesubmit =(e)=>{
    e.preventDefault()

    if(email && !emailPattern.test(email)){
      setErr('Invalid email format')
      return
    }else if(phonenumber && phonenumber.length < 4){
      setErr('name must be at least 4 character')
      return
    }else if(phonenumber && phonenumber.length < 10){
      setErr('Phone must be at least 10 character')
      return
    }else if(password && password.length < 6){
      setErr('Password must be at least 6 character')
      return
    }

    createUserWithEmailAndPassword(auth,email,password).then((result)=>{
      const user = result.user;
      updateProfile(user,{displayName:username}).then(()=>{
        const userCollection = collection(firestore,"users")
        addDoc(userCollection,{
          id:user.uid,
          name:username,
          phone:phonenumber
        }).then(()=>{
          navigate('/login')
        })
      })
    })
    
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phonenumber}
            onChange={(e)=>setPhonenumber(e.target.value)}

          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={handlesubmit}>Signup</button>
        </form>
        <a onClick={()=>navigate('/login')}>Login</a>
        { err ? <span style={{color:'red'}}>{err}</span> : ''}
      </div>
    </div>
  );
}
