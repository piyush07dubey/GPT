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
    <div className="relative min-h-screen bg-black">
      <Header />

      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <img
          src={image}
          alt="background"
          className="h-full w-full object-cover opacity-50 sm:opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Login Form Container */}
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <form className="w-full max-w-md rounded-lg bg-black/80 p-8 text-white shadow-2xl backdrop-blur-sm sm:p-10 md:p-12">
          <h1 className="mb-8 text-3xl font-bold sm:text-4xl">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          <div className="flex flex-col gap-4">
            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md border border-gray-600 bg-gray-900/70 p-4 placeholder:text-gray-400 transition-all focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
              />
            )}

            <input
              ref={email}
              type="text"
              placeholder="Email or mobile number"
              className="w-full rounded-md border border-gray-600 bg-gray-900/70 p-4 placeholder:text-gray-400 transition-all focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />

            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-gray-600 bg-gray-900/70 p-4 placeholder:text-gray-400 transition-all focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />

            {errorMessage && (
              <p className="py-2 text-lg font-bold text-red-500">{errorMessage}</p>
            )}
          </div>

          <button
            onClick={handleButtonClick}
            className="mt-8 mb-4 w-full rounded-md bg-red-600 py-4 text-lg font-bold text-white transition-colors shadow-md hover:bg-red-700"
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="mt-4 flex flex-col gap-4">
            <p className="text-gray-400">
              {isSignInForm ? (
                <>
                  New here?{" "}
                  <span
                    className="cursor-pointer font-medium text-white hover:underline"
                    onClick={() => setIsSignInForm(!isSignInForm)}
                  >
                    Sign up now.
                  </span>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <span
                    className="cursor-pointer font-medium text-white hover:underline"
                    onClick={() => setIsSignInForm(!isSignInForm)}
                  >
                    Sign in now.
                  </span>
                </>
              )}
            </p>

            <p className="max-w-[300px] text-xs text-gray-500">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;