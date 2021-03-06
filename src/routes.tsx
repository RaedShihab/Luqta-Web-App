import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";

const Layout = React.lazy(() => import('./components/layout/Layout'));
const MySignIn = React.lazy(() => import('./components/Auth/SignIn'));
const MySignUp = React.lazy(() => import('./components/Auth/SignUp'));

const MainRoutes: React.FC = () => {

  const loading: any = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  return (
    <div>
      <Suspense fallback={loading()}>
      <BrowserRouter>
      <Switch>
          <Route exact path='/signin' component={MySignIn} />
          <Route exact path='/signup' component={MySignUp} />
          {/* <Route exact path='/myads' component={MyAds} /> */}
          <Route path="/" component={Layout} />
          {/* <Redirect path="/my" to="/myads"/> */}
          </Switch>
      </BrowserRouter>
      </Suspense>
    </div>
  )
}


// const NotFound = () => {
//   return <div>Page Not Found</div>
// }

export default MainRoutes;
