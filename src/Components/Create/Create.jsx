import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {AuthContext,FirebaseContext} from '../../store/FirebaseContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {firestore, storage} from '../../firebase/config'
import { useNavigate } from 'react-router-dom';

const Create = () => {
  let [name,setName]=useState('')
  let [category,setCategory]=useState('')
  let [price,setPrice]=useState('')
  let [image,setImage]=useState(null)
  let [err,setErr]=useState('')
  const {user}=useContext(AuthContext)
  const navigate =useNavigate()
  // const {firebase}=useContext(FirebaseContext)
  
  const handleUpload =(e)=>{
    
    e.preventDefault()

    if(!image){
      setErr('image required')
      return
    }else if(name && name.length < 4){
      setErr('name must be at least 4 character')
      return
    }else if(category && category.length < 4){
      setErr('category must be at least 4 character')
      return
    }else if(price && price < 0){
      setErr('Price must be greaterthan 0 ')
      return
    }

    const refImage = ref(storage,`/Product/${image,name}`)
    const uploadImage = uploadBytesResumable(refImage,image)

    uploadImage.on("state_changed",(snapshot)=>{
    },(err) =>{
      alert(err.message)
    },
    ()=>{
      getDownloadURL(uploadImage.snapshot.ref).then((url)=>{
        const productCollection = collection(firestore,'products')
        addDoc(productCollection,{
          name,
          category,
          price,
          url,
          userId :user.uid,
          date:new Date().toDateString(),
        }).then(()=>{
          navigate("/")
        }).catch((err)=>{
          alert('cant add product deltails to firestore',err.message)
        })
      }).catch((err)=>{
        alert('cant get image url',err.message)
      })
    }
    )
  }

  
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <br />
          <br />
          <img  alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):""}></img>
            <br />
            <input  onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleUpload} className="uploadBtn">upload and Submit</button>
            { err ? <span style={{color:'red'}}>{err}</span> : ''}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
