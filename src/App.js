import React from "react";
import "./App.css";
import Game from "./components/Game";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css";
import SignUp from "./authentication/auth/Signup";
import Login from "./authentication/auth/Login";
import ForgotP from "./authentication/auth/ResetPassword"
import withAuthentication from "./authentication/withAuthentication";
import * as routes  from "./Routes"
  
const App = (props) => {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path={routes.HOME} exact component={Game} />
        <Route path={routes.SIGN_UP} exact component={SignUp}/>
        <Route path={routes.SIGN_IN} exact component={Login}/>
        <Route path={routes.PASSWORD_FORGET} exact component={ForgotP}/>
        <Route path={routes.GAME} exact component={Game} />
      </Switch>
      </BrowserRouter>
    </div>
  );
};

// export default App;
export default withAuthentication(App); //using HoC to handle sessio
