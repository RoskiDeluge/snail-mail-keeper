import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Subscription from "./components/pages/Subscription";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import SubscriptionState from "./context/subscription/SubscriptionState";
import "./App.css";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <SubscriptionState>
            <Router>
              <Fragment>
                <Navbar />
                <div className="container">
                  <Alerts />
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      component={Dashboard}
                    />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute
                      exact
                      path="/subscription"
                      component={Subscription}
                    />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </SubscriptionState>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
