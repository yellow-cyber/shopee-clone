import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../misc/Loading";
import { API } from "../utils/API";
import Body from "./Body";
import Home from "./Home";
import Wrapper from "./Wrapper";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [render, setRender] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const checkAuthenticated = async () => {
    try {
      const res = await API.get("/users/current", {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setCurrentUser(res.data);
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
    // adi didi nalilipat ka ha proper routing
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/login">
            {!auth ? (
              <Login setAuth={setAuth} setCurrentUser={setCurrentUser}></Login>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/register">
            {!auth ? (
              <Register setAuth={setAuth}></Register>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/">
            {auth ? (
              <Home setAuth={setAuth} auth={auth}>
                <Sidebar setAuth={setAuth} auth={auth} />
                <Wrapper>
                  <Navbar currentUser={currentUser} />
                  <Body currentUser={currentUser} />
                </Wrapper>
              </Home>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
