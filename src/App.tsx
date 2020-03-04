import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withRoot from './withRoot';
// import Layout from './components/layout/Layout';
import './components/common.css';
import MainRoutes from './routes';
import { BrowserRouter, Route, Switch } from "react-router-dom";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(20)
    }
  });

class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <MainRoutes />
          {/* <Route path="/" render={() => {
            return (<Switch>
              <Route exact path="/dashboard" component={Layout} />
              <Redirect to="/dashboard" />
            </Switch>)
          }} /> */}
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );

  }
}

const NotFound = () => {
  return <div>Page Not Found</div>
}

export default withRoot(withStyles(styles)(Index))
