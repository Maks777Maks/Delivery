import React from 'react';

const CommentsChart = React.lazy(() => import('../views/adminViews/CommentsChart'));
const PersonsChart = React.lazy(() => import('../views/adminViews/PersonsChart'));
const UsersStats = React.lazy(() => import('../views/adminViews/UsersStats'));
const Profile = React.lazy(() => import('../views/adminViews/Profile'));
const GraphPercentDishes = React.lazy(() => import('../views/adminViews/GraphPercentageDishes'));

const routes = [
  { path: '/admin', exact: true, name: 'UsersStats', component: UsersStats },
  { path: '/admin/clients', exact: true, name: 'adminClients', component: PersonsChart },
  { path: '/admin/comments', exact: true, name: 'Login', component: CommentsChart },
  { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/admin/graphcuisine', exact: true, name: 'GraphPercentDishes', component: GraphPercentDishes },
];

export default routes;  