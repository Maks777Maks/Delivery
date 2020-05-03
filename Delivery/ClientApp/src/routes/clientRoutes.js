import React from 'react';

const UserProfile = React.lazy(() => import("../views/ProfileManager"));

const emptyPage = () => {
    return(<h1>Ми Вас раді бачити!</h1>);
};

const clientRoutes = [
    { path: '/client', exact: true, name: 'clientEmpty', component: emptyPage },
    { path: '/client/profile', exact: true, name: 'userProfile', component: UserProfile },
];

export default clientRoutes;  