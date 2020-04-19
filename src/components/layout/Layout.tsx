import React, { useEffect } from "react";
import { withTranslation } from "react-i18next";
import { compose } from 'redux';
import { Route, Router, Switch } from "react-router";
import classNames from "classnames";
import { MuiThemeProvider, createMuiTheme, useMediaQuery, Container } from "@material-ui/core";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { CssBaseline, Toolbar } from "@material-ui/core";
// import {PrivateRoute} from '../Auth/Components/privateRoutes';
import Header from "./Header";
import Sidebar from "./Sidebar";
import FooterCategory from "./FooterCategory";
import Footer from "./Footer";
import Box from "@material-ui/core/Box";
import withRoot from "../../withRoot";
import { styles } from "./styles";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import Dashboard from '../views/Dashboard/Dashboard'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const MyAds = React.lazy(() => import('../views/MyAds/MyAds'));
const AdDetail = React.lazy(() => import('../views/AdDetail/AdDetail'));
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props: any) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}

interface ILayoutProps {
  classes: any;
  i18n: any
}


const Layout: React.FC<ILayoutProps> = ({ classes, i18n }) => {

  const {language} : any = i18n
  const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));
  const [direction, setDirection] = React.useState(language==="ar"? "rtl" : "ltr");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        direction: direction === "ltr" ? "ltr" : "rtl",
        overrides: {
          MuiToolbar: {
            dense: {
              minHeight: "112px"
            }
          }
        }
      }),
    [direction],
  );

  useEffect(() => {
    if (direction) {
      let body: any = document.getElementsByTagName("body");
      body[0].style.direction = direction;
    }
  }, [direction])
  return (
    <RTL>
    <MuiThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" bgcolor="background.paper">
        <CssBaseline />
        <Box>
          <Header direction={direction} setDirection={setDirection} leftDrawerOpen={leftDrawerOpen} setLeftDrawerOpen={setLeftDrawerOpen} />
        </Box>
        <Sidebar leftDrawerOpen={leftDrawerOpen} setLeftDrawerOpen={setLeftDrawerOpen} />
        <Toolbar variant="dense"  className={classNames( fullScreen && classes.smToolbar)} />
        <Box flexGrow={1} style={{ height: "100%", overflow: "hidden" }}>
          <main className={classNames(classes.content)}>
          <Router history={history}>
              <Switch>
                <Route exact path='/myads' component={MyAds} />
                <Route exact path='/' component={Dashboard} />
                
                <Route exact path='/:subCateg/:categ' component={Dashboard} />
                <Route exact path='/:id/search/:name' component={AdDetail} />
                <Route exact path='/:searchKeyWords/:subCateg/:categ' component={Dashboard} />
                <Route exact path='/any/any/search/:searchKeyWords' component={Dashboard} />
                
                

                
                
                {/* <Redirect path="/" to="/1"/> */}
              </Switch>
          </Router>  
          </main>
        </Box>
        <Box flexGrow={1} style={{ height: "100%" }}>
          <Container>
            <FooterCategory />
          </Container>
        </Box>
        <Box flexGrow={1} style={{ height: "100%", backgroundColor: "#474747", color: "#fff" }}>
          <Container>
            <Footer />
          </Container>
        </Box>
      </Box>
    </MuiThemeProvider>
    </RTL>
  );
};


// export default withRoot(withStyles(styles)(Layout));
const connectedLayout : any = compose(
  withStyles(styles),
  withTranslation("dashboard/dashboard"),
)(Layout);

export default withRoot(connectedLayout);
