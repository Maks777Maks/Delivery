import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import './App.scss';

// Pages
const LoginPage = React.lazy(() => import("./views/defaultViews/LoginPage"));
const HomePage = React.lazy(() => import("./views/defaultViews/HomePage"));
const ForgotPasswordPage = React.lazy(() => import("./views/defaultViews/ForgotPasswordPage"));
const ChangePasswordPage = React.lazy(() => import("./views/defaultViews/ChangePasswordPage"));
const DishesPage = React.lazy(()=> import("./views/clientViews/TypesOfDishes"))
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
            <Route exact path="/forgot-password" name="ForgotPassword" render={ props => <ForgotPasswordPage { ...props } /> } />
            <Route exact path="/change-password/:id" name="ChangePassword" render={ props => <ChangePasswordPage { ...props } /> } />
            <Route exact path="/alldishes" name="Dishes" render={props => <DishesPage {...props} /> } />
          </Switch>
        </Suspense>
        </Router> 
      );
    }
  };
  
  export default App;