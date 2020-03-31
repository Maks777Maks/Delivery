import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import './App.scss';

// Pages
const LoginPage = React.lazy(() => import("./views/defaultviews/LoginPage"));

// Layouts
const AdminLayout = React.lazy(() => import("./layouts/adminLayout/AdminLayout"));

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
            <Route path="/admin" name="Admin" render={ props => <AdminLayout { ...props } /> } />
            <Route exact path="/login" name="Login" render={ props => <LoginPage { ...props } /> } />
          </Switch>
        </Suspense>
        </Router> 
      );
    }
  };
  
  export default App;