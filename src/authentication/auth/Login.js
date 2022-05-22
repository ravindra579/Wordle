import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { auth } from "../../firebase";
import { auth as firebaseAuth } from "../../firebase/firebase";

import { handleAuthError } from "./handleAuthError";

const Login = () => {
  const history = useHistory();
  const redirectPath = "/wordle";

  // ** State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (firebaseAuth.currentUser && firebaseAuth.currentUser.uid) {
      history.push("/wordle");
    }
  }, [firebaseAuth]);

  useEffect(() => {
    const timer = () => {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    };

    return timer;
  }, [errorMessage]);

  // ** Login Functions
  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(redirectPath);
      })
      .catch((err) => {
        const error = handleAuthError(err);
        setErrorMessage(error);
      });
  };

  return (
    <>
     <div class="wrapper">
         <div class="title-text">
            <div class="title login">
               Signin
            </div>
         </div>
         <div class="form-container">
            <div class="form-inner">
               <form onSubmit={handleEmailPasswordLogin}>
                  <div class="field">
                     <input type="text" placeholder="Email Address"
                      required onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div class="field">
                     <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div class="pass-link">
                     <Link to="/forgot-password">Forgot password?</Link>
                  </div>
                  <div class="field btn">
                     <div class="btn-layer"></div>
                     <input type="submit" value="Login" />
                  </div>
                  <div class="signup-link">
                     Not a member? <Link to="/signup">Signup now</Link>
                  </div>
               </form>
            </div>
         </div>     
      </div>
    </>
  );
};

export default Login;
