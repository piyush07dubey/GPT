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
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import lang from "../utils/languageConstants";


const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
  // Sign-out successful.
}).catch((_error) => {
  // An error happened.
  navigate("/error")
});
  }
  const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange=(e)=>{
dispatch(changeLanguage(e.target.value))
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
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent 
    px-6 md:px-8 py-4 flex flex-col md:flex-row">
      <img className="h-10 md:h-12 w-auto mx-auto md:mx-0" src={image} alt="logo" />
      {user && (
        <div className="flex items-center gap-3">
         { showGptSearch && (<select className=" bg-gray-800 text-white rounded-lg p-2 m-2"
          onChange={handleLanguageChange}>
           {SUPPORTED_LANGUAGES.map(lang=><option
           key={lang.identifier} value={lang.identifier}>
            {lang.name}

           </option>)}
          </select>
         )
}
          <button className="py-2 px-4 my-2 mx-4 bg-purple-800  text-white rounded-lg" 
          onClick={handleGptSearchClick}>
            {showGptSearch ? "Home" : "GPT Search"}</button>
          <img className="h-8 w-8 md:h-10 md:w-10 rounded" src={user.photoURL} alt="user" />
          <button 
            onClick={handleSignOut} 
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 md:text-base"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default Header;