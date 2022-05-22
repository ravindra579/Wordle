import React, { useState, useEffect } from "react";
import "./index.css"
import { Link, useHistory } from "react-router-dom";

import { auth } from "../../firebase";
import { auth as firebaseAuth } from "../../firebase/firebase";
const Signup = () => {
  const history = useHistory();
  
  const redirectPath = "/wordle";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (firebaseAuth.currentUser && firebaseAuth.currentUser.uid) {
      history.push("/")
    }
  }, [])

  useEffect(() => {
    const timer = () => {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    };

    return timer;
  }, [errorMessage]);

  // ** Login Functions
  const handleSignup = (e) => {
    e.preventDefault();
    if(password===confirmPass){
    auth.doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push(redirectPath);
        console.log("sucess")
      })
      .catch((err) => {
        console.log("error")
      });
    }else{
      setErrorMessage("Password Not matches")
    }
  };

  return (
    <>
     <div class="wrapper">
         <div class="title-text">
            <div class="title signup">
               Signup
            </div>
         </div>
         <div class="form-container">
            <div class="form-inner">
               <form class="signup" onSubmit={handleSignup}>
                  <div class="field">
                     <input type="text" placeholder="Email Address" required 
                     onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div class="field">
                     <input type="password" placeholder="Password" required 
                     onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div class="field">
                     <input type="password" placeholder="Confirm password" required 
                     onChange={(e) => setConfirmPass(e.target.value)}/>
                  </div>
                  <div class="field btn">
                     <div class="btn-layer"></div>
                     <input type="submit" value="Signup" />
                  </div>
                  <div class="signup-link">
                    Already a member? <Link to="/signin">Signin now</Link>
                  </div>
               </form>
            </div>
         </div>
      </div>
    </>
  );
};

export default Signup;
