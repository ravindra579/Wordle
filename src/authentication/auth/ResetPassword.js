import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth as firebaseAuth } from "../../firebase/firebase";

const ResetPassword = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (firebaseAuth.currentUser && firebaseAuth.currentUser.uid) {
      history.push("/wordle");
    }
  }, []);

  useEffect(() => {
    const timer = () => {
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    };

    return timer;
  }, [errorMessage]);


  return (
    <>
         <div class="wrapper">
         <div class="title-text">
            <div class="title login">
               Forgot Password
            </div>
         </div>
         <div class="form-container">
            <div class="form-inner">
               <form>
                  <div class="field">
                     <input type="text" placeholder="Email Address" required />
                  </div>
                  <div class="field btn">
                     <div class="btn-layer"></div>
                     <input type="submit" value="Forgot Password" />
                  </div>
               </form>
            </div>
         </div>     
      </div>
    </>
  );
};

export default ResetPassword;
