import React from "react";
import classNames from "classnames";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { CssBaseline, Toolbar } from "@material-ui/core";
import Header from "./Header";
import Dashboard from "../views/Dashboard";
import Box from "@material-ui/core/Box";
import withRoot from "../../withRoot";
import { styles } from "./styles";

interface ILayoutProps {
  classes: any;
}

const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      dense: {
        minHeight: "112px"
      }
    }
  }
});
const Layout: React.FC<ILayoutProps> = ({ classes }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" bgcolor="background.paper">
        <CssBaseline />
        <Box>
          <Header />
        </Box>
        <Toolbar variant="dense" />
        <Box flexGrow={1} style={{ height: "100%", overflow: "hidden" }}>
          <main className={classNames(classes.content)}>
            <Dashboard />
          </main>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
};

export default withRoot(withStyles(styles)(Layout));
