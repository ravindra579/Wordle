import React, { useState, useEffect } from "react";

import {
  makeStyles,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import {
  FormGroup,
  Label,
  Input,
  Form,
  Row,
  div,
  CustomInput,
  Alert,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

import { auth } from "../../firebase";
import { auth as firebaseAuth } from "../../firebase/firebase";

import { handleAuthError } from "./handleAuthError";


const useStyles = makeStyles((theme) => ({
  main: {
    position: "relative",
  },

  logoContainer: {
    fontSize:"2vw",
    position: "absolute",
    top: 10,
    left: 10,
    [theme.breakpoints.down("sm")]: {
      fontSize:"2.5vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize:"4vw",
    },
  },

  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
  },

  heading: {
    fontSize: "2vw",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5vw",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "4vw",
    },
  },

  formSection: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    positon: "relative",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0 5%",
    },
  },

  loader: {
    zIndex: 3,
    position: "absolute",
    background: theme.palette.primary.light,
    width: "50%",
    opacity: 0.3,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  formContainer: {
    width: "80%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  form: {
    margin: "2rem 0",
  },

  checkboxSection: {
    marginLeft: "1.3rem",
    // display: "flex",
    // alignItems: "center"
  },

  loginButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "2rem",
  },

  signupText: {
    color: "gray",
    textAlign: "center",

    "& > span": {
      color: "black",
      fontWeight: "bold",
      marginLeft: "0.5rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },

  // ** Image Section **
  imageSection: {
    width: "50%",
  },

  imageContainer: {
    position: "relative",
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  imageOverlayTextContainer: {
    zIndex: 2,
    position: "absolute",
    top: "80%",
    display: "flex",
    justifyContent: "center",
  },

  overlayInnerContainer: {
    width: "80%",
    padding: "1rem 2rem",
    background: "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur(4px)",
    "-webkit-backdrop-filter": "blur(4px)",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    color: "white",
  },

  loginUsing: {
    // margin: "0 4rem 0 1rem",
    // alignItems: "center",
    // textAlign: "center",
    // justifyContent: "center"
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  flex:{
    display:"flex",
    justifyContent:"space-between"
  }
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const mediumDevice = useMediaQuery(theme.breakpoints.down("sm"));

  const redirectPath = "/wordle";

  // ** State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(redirectPath);
        setIsLoading(false);
      })
      .catch((err) => {
        const error = handleAuthError(err);
        setErrorMessage(error);
        setIsLoading(false);
      });
  };

  const hadleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEmailPasswordLogin(e);
    }
  };

  // ** Waitlist
  const [showModal, setShowModal] = useState(false)

  const handleShowWaitlistModal = () => {
    setShowModal(true)
  }

  const hideModal = () => {
    setShowModal(false)
  }

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
