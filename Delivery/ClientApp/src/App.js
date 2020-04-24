import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import './App.scss';

// Pages
const LoginPage = React.lazy(() => import("./views/defaultViews/LoginPage"));
const HomePage = React.lazy(() => import("./views/defaultViews/HomePage"));

// Layouts
const AdminLayout = React.lazy(() => import("./layouts/adminLayout/AdminLayout"));

// ProfileTest
const ProfileLayout = React.lazy(() => import("./views/ProfileManager/"));


  class App extends Component { 

    state = {
      isLoading: false,
      isError: false
    }
  
    render() { 
      return (
        <Router>  
        <Suspense fallback={ <div>Загрузка...</div> }>
          <Switch>
            <Route exact path="/" name="Home" render={ props => <HomePage { ...props } /> } />
            <Route path="/admin" name="Admin" render={ props => <AdminLayout { ...props } /> } />
            <Route exact path="/login" name="Login" render={ props => <LoginPage { ...props } /> } />
            <Route exact path="/profile" name="Profile" render={ props => <ProfileLayout { ...props } /> } />
          </Switch>
        </Suspense>
        </Router> 
      );
    }
  };
  
  export default App;