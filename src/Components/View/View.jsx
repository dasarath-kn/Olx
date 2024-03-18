import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/config';

function View() {
  const [userDetails,setUserDetails]=useState('')
  const {postDetails} =useContext(PostContext)
  const {firebase} =useContext(FirebaseContext)
  useEffect(()=>{
    const {userId} = postDetails
    const userCollection = collection(firestore,'users')

    getDocs(query(userCollection,where('id','==',userId))).then((res)=>{
      res.forEach((doc)=>{
        setUserDetails(doc.data())
      })
    }).catch((err)=>{
      alert(err.message)
    })

  })
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt={postDetails.name}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>
        { userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.name}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
