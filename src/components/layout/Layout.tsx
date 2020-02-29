import React, { useEffect } from "react";
import classNames from "classnames";
import { MuiThemeProvider, createMuiTheme, useMediaQuery, Container } from "@material-ui/core";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { CssBaseline, Toolbar } from "@material-ui/core";
import Header from "./Header";
import Sidebar from "./Sidebar";
import FooterCategory from "./FooterCategory";
import Footer from "./Footer";
import Dashboard from "../views/Dashboard";
import Box from "@material-ui/core/Box";
import withRoot from "../../withRoot";
import { styles } from "./styles";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

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
}

const theme = createMuiTheme({
  direction: 'ltr',
  overrides: {
    MuiToolbar: {
      dense: {
        minHeight: "112px"
      }
    }
  }
});
const Layout: React.FC<ILayoutProps> = ({ classes }) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));
  const [direction, setDirection] = React.useState("ltr");

  useEffect(() => {
    if (direction) {
      let body: any = document.getElementsByTagName("body");
      body[0].style.direction = direction;
    }
  }, [direction])
  return (
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
            <Dashboard />
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
  );
};

export default withRoot(withStyles(styles)(Layout));
