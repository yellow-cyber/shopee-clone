import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Loading from "../misc/Loading";
import { API } from "../utils/API";
import Home from "./Home";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [render, setRender] = useState(false);
  const checkAuthenticated = async () => {
    try {
      const res = await API.get("/users/current", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      res.data.username ? setAuth(true) : setAuth(false);
      setRender(true);
    } catch (err) {
      setRender(true);
      setAuth(false);
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);

  if (!render) return <Loading />;
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/">
            {auth ? (
              <Home setAuth={setAuth} auth={auth}></Home>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route exact path="/login">
            {!auth ? <Login setAuth={setAuth}></Login> : <Redirect to="/" />}
          </Route>
          <Route exact path="/register">
            {" "}
            {!auth ? (
              <Register setAuth={setAuth}></Register>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
