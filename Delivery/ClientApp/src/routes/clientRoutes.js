import React from 'react';

const UserProfile = React.lazy(() => import("../views/ProfileManager"));

const EmptyPage = () => {
    return(<h1>Ми раді Вас бачити!</h1>);
};

const clientRoutes = [
    { path: '/client', exact: true, name: 'clientEmpty', component: EmptyPage },
    { path: '/client/profile', exact: true, name: 'userProfile', component: UserProfile }
];

export default clientRoutes;  