import React from 'react';

const CommentsChart = React.lazy(() => import('../views/adminViews/CommentsChart'));
const PersonsChart = React.lazy(() => import('../views/adminViews/PersonsChart'));
const UsersStats = React.lazy(() => import('../views/adminViews/UsersStats'));
//const TypesOfDishes = React.lazy(()=> import('../views/clientViews/TypesOfDishes'));
//const Dishes = React.lazy(()=> import('../views/clientViews/Dishes'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/admin', exact: true, name: 'UsersStats', component: UsersStats },
  { path: '/admin/clients', exact: true, name: 'Login', component: PersonsChart },
  { path: '/admin/comments', exact: true, name: 'Login', component: CommentsChart },
 // {path: '/admin/gettypesdishes', exact: true, name: 'TypesOfDishes', component: TypesOfDishes },
//  {path: '/admin/getdishes', exact: true, name: 'Dishes', component: Dishes },
 ];

export default routes;  