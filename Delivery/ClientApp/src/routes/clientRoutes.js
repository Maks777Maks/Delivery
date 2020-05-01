import React from 'react';


const TypesOfDishes = React.lazy(()=> import('../views/clientViews/TypesOfDishes'));
const Dishes = React.lazy(()=> import('../views/clientViews/Dishes'));
const Cart = React.lazy(()=> import('../views/clientViews/Cart'))

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  
  {path: '/client/gettypesdishes', exact: true, name: 'TypesOfDishes', component: TypesOfDishes },
  {path: '/client/getdishes', exact: true, name: 'Dishes', component: Dishes },
  {path: '/client/alldishes', exact: true, name: 'Dishes', component: Dishes },
  {path: '/client/cart', exact: true, name: 'Cart', component: Cart},
 ];

export default routes; 