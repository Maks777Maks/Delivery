import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {} from "mdbreact";
//import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../views/defaultViews/LoginPage/reducer';
//import { serverUrl } from '../../config';

import hero_1 from '../../assets/img/hero_1.jpg';
import '../../views/defaultViews/scss/style.scss';

// routes config
import clientRoutes from '../../routes/clientRoutes';
import get from 'lodash.get';

const ClientNavbar = React.lazy(() => import('./clientNavbar'));
const ClientFooter = React.lazy(() => import('./clientFooter'));

class ClientLayout extends Component {

    loading = () => <div>Loading...</div>

    signOut(e) {
        e.preventDefault()
        this.props.history.push('/login')
    }

    render() {
        const { login } = this.props;
        console.log(login);
        let isAccess = true;
        
        if (login.isAuthenticated === undefined) {
            return (
                <Redirect to="/login" />
            );
        }
        if (login.isAuthenticated) {
            const { roles } = login.user;
            for (let i = 0; i < roles.length; i++) {
                if (roles[i] === 'User')
                    isAccess = true;
            }
        }

        const content = (
            <div>
                <Suspense fallback={this.loading()}>
                    <ClientNavbar />
                </Suspense>
                <div>
                <section className="home-slider owl-carousel">
                    <div className="slider-item" style={{ backgroundImage: "url(" + hero_1 + ")" }}>

                        <div className="container">
                            <div className="row slider-text align-items-center justify-content-center">
                                <div className="col-md-8 text-center col-sm-12 ">
                                    
                                <Suspense fallback={this.loading()}>
                                            <Switch>
                                                {clientRoutes.map((route, idx) => {
                                                    return route.component ? (
                                                        <Route
                                                            key={idx}
                                                            path={route.path}
                                                            exact={route.exact}
                                                            name={route.name}
                                                            render={props => (
                                                                <route.component {...props} />
                                                            )} />
                                                    ) : (null);
                                                })}
                                                <Redirect to="/login" />
                                            </Switch>
                                        </Suspense>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                </div>
                <Suspense fallback={this.loading()}>
                    <ClientFooter />
                </Suspense>
            </div>
        )

        return (
            isAccess ? content : <Redirect to='/login' />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        login: get(state, 'login')
    }
}

export default connect(mapStateToProps, { logout })(ClientLayout);
