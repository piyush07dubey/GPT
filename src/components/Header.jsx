import React from "react";
import image from "../assets/image.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import {addUser,removeUser} from "../utils/userSlice";


const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
  // Sign-out successful.
}).catch((_error) => {
  // An error happened.
  navigate("/error")
});
  }
  useEffect(()=>{
   const unsubscribe= onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in,
    const {uid,email,displayName,photoURL} = user;
    dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
navigate('/browse');
  
    // ...
  } else {
    // User is signed out
    dispatch(removeUser());
    navigate('/')


  }
});
return ()=>unsubscribe();
}, [dispatch, navigate])
  return (
    <>
   
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between ">
      <img className="w-44" src={image} alt="header" />
    </div>
    {user && (
    <div className="absolute right-2 flex py-4 ">
      <img className="w-12 " src={user.photoURL} alt="header" />
      <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded-md">Sign out</button>
    </div>
    )}
     </>
  );
};

export default Header;