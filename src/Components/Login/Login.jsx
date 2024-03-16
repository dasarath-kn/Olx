import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import{auth} from '../../firebase/config'
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate =useNavigate()
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  let [err,setErr]=useState('')
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleLogin =(e)=>{
    e.preventDefault()
    if(email && emailPattern.test(email)){
      setErr('Invalid email format')
    }else if(password && password.length>6){
      setErr('Password must be at least 4 character')
      return
    }

    signInWithEmailAndPassword(auth,email,password).then(()=>{
      navigate('/')
    }).catch((err)=>{
      setErr('user not found')
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
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
          <button onClick={handleLogin}>Login</button>
          { err ? <span style={{color:'red'}}>{err}</span> : ''}
        </form>
        <a onClick={()=>navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
