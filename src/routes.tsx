import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

const Layout = React.lazy(() => import('./components/layout/Layout'));
const MySignIn = React.lazy(() => import('./components/Auth/SignIn'));
const MySignUp = React.lazy(() => import('./components/Auth/SignUp'));

const MainRoutes: React.FC = () => {

  const loading: any = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  return (
    <Switch>
      <Suspense fallback={loading()}>
          <Switch>
          <Route exact path='/signin' component={MySignIn} />
          <Route exact path='/signup' component={MySignUp} />
          <Route exact path="/dashboard" component={Layout} />
          <Redirect path='*' to={'/signin'} />
          {/* <Route path="*" component={NotFound} /> */}
          </Switch>
      </Suspense>
    </Switch>
  )
}


// const NotFound = () => {
//   return <div>Page Not Found</div>
// }

export default MainRoutes;
