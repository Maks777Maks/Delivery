import React, { Suspense, Component } from 'react';
import { Redirect, Route, Switch, HashRouter as Router } from "react-router-dom";
import './App.scss';

// Pages
const LoginPage = React.lazy(() => import("./views/defaultViews/LoginPage"));
const RegisterPage = React.lazy(() => import("./views/defaultViews/RegisterPage"));
const HomePage = React.lazy(() => import("./views/defaultViews/HomePage"));
const ForgotPasswordPage = React.lazy(() => import("./views/defaultViews/ForgotPasswordPage"));
const ChangePasswordPage = React.lazy(() => import("./views/defaultViews/ChangePasswordPage"));
const DishesPage = React.lazy(()=> import("./views/clientViews/TypesOfDishes"))
const CartPage = React.lazy(()=> import("./views/clientViews/Cart"))
const ChangeImage = React.lazy(() => import("./components/ChangeImage"));

// Layouts
const AdminLayout = React.lazy(() => import("./layouts/adminLayout/AdminLayout"));
const ClientLayout = React.lazy(() => import("./layouts/clientLayout/clientLayout"));

class App extends Component {

    state = {
        isLoading: false,
        isError: false
    }

    render() {
        return (
            <Router>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Switch>
                        <Route exact path="/" name="Home" render={props => <HomePage {...props} />} />
                        <Route path="/client" name="Client" render={props => <ClientLayout {...props} />} />
                        <Route path="/admin" name="Admin" render={props => <AdminLayout {...props} />} />
                        <Route exact path="/login" name="Login" render={props => <LoginPage {...props} />} />
                        <Route exact path="/register" name="Register" render={props => <RegisterPage {...props} />} />
                        <Route exact path="/forgot-password" name="ForgotPassword" render={props => <ForgotPasswordPage {...props} />} />
                        <Route exact path="/change-password/:id" name="ChangePassword" render={props => <ChangePasswordPage {...props} />} />
                        <Route exact path="/alldishes" name="Dishes" render={props => <DishesPage {...props} /> } />
                        <Route path="/cart" name="Cart" render={props=> <CartPage {...props} /> } />
                        <Route exact path="/changeimage" name="ChangeImage" render={props => <ChangeImage {...props} />} />
                        <Redirect to="/" />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
};

export default App;