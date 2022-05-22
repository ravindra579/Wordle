import React, { useState, useEffect } from "react";

import {
  makeStyles,
  Typography,
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
  Col,
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
    position: "absolute",
    top: 5,
    left: 10,

    "& > img": {
      height: "40px",
    },

    [theme.breakpoints.down("sm")]: {
      "& > img": {
        height: "20px",
      },
    },
  },

  root: {
    width: "100vw",
    height: "100vh",
    display: "flex",
  },

  heading: {
    fontSize: "2rem",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },

  formSection: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    positon: "relative",

    [theme.breakpoints.down("md")]: {
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

    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },

  formContainer: {
    width: "50%",

    [theme.breakpoints.down("md")]: {
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
    marginTop: "4rem",
    marginBottom:"5vh",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const mediumDevice = useMediaQuery(theme.breakpoints.down("md"));

  // ** State
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);

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

  // ** Login Functions
  const handleSignup = () => {
    setIsLoading(true);
    auth
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setReset(true);
        setIsLoading(false);
      })
      .catch((err) => {
        const error = handleAuthError(err);
        setErrorMessage(error);
        setIsLoading(false);
      });
  };

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
