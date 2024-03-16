import { useState,useEffect,useContext } from 'react'
import {BrowserRouter as Router ,Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home.jsx'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import Create from './Pages/Create.jsx'
import {AuthContext,FirebaseContext} from './store/FirebaseContext.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/config.jsx'
function App() {
const {user,setUser} =useContext(AuthContext)
const {firebase} =useContext(FirebaseContext)
useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    setUser(user)
  })
},[])
  return (
   
    <Router>
        <Routes>
           <Route path='/' element={<Home />} />
           <Route path='/signup' element={< Signup/>} />
           <Route path='/login' element={< Login/>} />
           <Route path='/create' element={< Create/>} />
           
           
           
        </Routes>
      </Router>
   
      
      
  
  )
}

export default App
