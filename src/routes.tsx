import React from 'react';
import DefaultLayout from './components/layout/Layout';

const Dashboard = React.lazy(() => import('./components/views/Dashboard'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/', name: 'Dashboard', component: Dashboard },
];

export default routes;
