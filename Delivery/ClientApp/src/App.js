import React, { Suspense, Component } from 'react';
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import './App.scss';


// Pages
const LoginPage = React.lazy(() => import("./views/defaultViews/LoginPage"));
const DishesPage = React.lazy(()=> import("./views/clientViews/TypesOfDishes"))


// Layouts
const AdminLayout = React.lazy(() => import("./layouts/adminLayout/AdminLayout"));
const ClientLayout = React.lazy(()=> import("./layouts/clientLayout/ClientLayout"));


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
            <Route path="/client" name="Client" render={props => <ClientLayout {...props} />} />
            <Route exact path="/alldishes" name="Dishes" render={props => <DishesPage {...props} /> } />
          </Switch>
        </Suspense>
        </Router> 
      );
    }
  };
  
  export default App;