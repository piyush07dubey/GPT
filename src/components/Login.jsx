import React, { useState, useRef } from "react";
import Header from "./Header";
import image from "../assets/image1.png";
import { checkValidateData } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { USER_AVATAR } from "../utils/constants";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name=useRef(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleButtonClick = (e) => {
    e.preventDefault();

    const emailValue = email.current?.value;
    const passwordValue = password.current?.value;

    const message = checkValidateData(emailValue, passwordValue);
    setErrorMessage(message);

    if (message) return; // Stop if validation failed

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current?.value,
            photoURL: {USER_AVATAR}
          }).then(() => {
          const {uid,email,displayName,photoURL}=auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}));
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
         
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />

      {/* Background Image */}
      <div className="fixed top-0 left-0 -z-10 bg-black w-screen h-screen">
        <img
          src={image}
          alt="background"
          className="w-full h-full object-cover opacity-50 sm:opacity-60"
        />
      </div>

      {/* Login Form Container */}
      <div className="flex justify-center items-center min-h-screen px-4 pt-20">
        <form
          className="p-10 sm:p-14 bg-black/80 w-full max-w-[450px] text-white rounded-lg shadow-2xl backdrop-blur-sm"
        >
          <h1 className="font-bold text-3xl sm:text-4xl mb-8 bg-opacity-70">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          <div className="flex flex-col gap-4">

            {!isSignInForm && (
              <input
              ref={name}
                type="text"
                placeholder="Full Name"
                className="p-4 w-full bg-gray-900/70 rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-gray-400"
              />
            )}

            <input
              ref={email}
              type="text"
              placeholder="Email or mobile number"
              className="p-4 w-full bg-gray-900/70 rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-gray-400"
            />

            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-4 w-full bg-gray-900/70 rounded-md border border-gray-600 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all placeholder:text-gray-400"
            /> 
            <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          </div>

          <button
            onClick={handleButtonClick}
            className="py-4 mt-8 mb-4 bg-[#E50914] hover:bg-[#C11119] w-full rounded-md font-bold text-lg transition-colors shadow-md"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex flex-col gap-4 mt-4">
            <p className="text-gray-400">
              {isSignInForm ? (
                <>
                  New here?{" "}
                  <span
                    className="text-white hover:underline cursor-pointer font-medium"
                    onClick={() => setIsSignInForm(!isSignInForm)}
                  >
                    Sign up now.
                  </span>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <span
                    className="text-white hover:underline cursor-pointer font-medium"
                    onClick={() => setIsSignInForm(!isSignInForm)}
                  >
                    Sign in now.
                  </span>
                </>
              )}
            </p>

            <p className="text-xs text-gray-500 max-w-[300px]">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;