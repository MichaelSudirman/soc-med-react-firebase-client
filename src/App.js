import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
// Components
import Navbar from "./components/Navbar";
// Utils
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";
// Material UI imports
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

/*
  setting axios default url under the POST bug,
  cannot POST using proxy key under pacakage.json
*/
axios.defaults.baseURL = "https://us-central1-soc-med.cloudfunctions.net/api";

const theme = createMuiTheme(themeObject);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
    window.location.href = "/login";
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <>
        {/* Icons made by smashicon */}
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <div className="App">
              <Router>
                <Navbar />
                <div className="container">
                  <Switch>
                    <Route exact path="/" component={home} />
                    <AuthRoute
                      exact
                      path="/login"
                      component={login}
                      authenticated={authenticated}
                    />
                    <AuthRoute
                      exact
                      path="/signup"
                      component={signup}
                      authenticated={authenticated}
                    />
                  </Switch>
                </div>
              </Router>
            </div>
          </Provider>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
