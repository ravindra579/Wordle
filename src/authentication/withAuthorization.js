import React from "react";
import { withRouter } from "react-router-dom";

import AuthUserContext from "./AuthUserContext";
import { firebase } from "../firebase";
import * as routes from "../Routes";
import { auth as firebaseAuth } from "../firebase/firebase";
const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        console.log(authUser)
        if (firebaseAuth.currentUser && firebaseAuth.currentUser.uid) {
          console.log("problem1")
          //if the authorization fails, redirects to sign in page
            this.props.history.push(routes.GAME);
        }else{
          this.props.history.push(routes.SIGN_IN);
          console.log("problem")
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {/* it either renders the passed component or not */}
          {authUser =>
            authUser ? (
              <Component {...this.props} loggedUser={authUser} />
            ) : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization); //using withRouter so we have access to history props
};

export default withAuthorization;
