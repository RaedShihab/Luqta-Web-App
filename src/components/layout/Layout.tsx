import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline, Toolbar } from '@material-ui/core';
import Header from './Header';
import Dashboard from '../views/Dashboard';
import Box from '@material-ui/core/Box';
import withRoot from '../../withRoot';
import { styles } from './styles';

interface ILayoutProps {
  classes: any;
}

const Layout: React.FC<ILayoutProps> = ({ classes }) => {	
  return (
    <>
      {/* // <Container fixed> */}
        <Box display="flex" flexDirection="column" bgcolor="background.paper" style={{ height: '100vh' }}>
          <CssBaseline />
          <Box>
            <Header />
          </Box>
          <Toolbar variant="dense" />
          <Box flexGrow={1} style={{  height: "100%", overflow: "hidden" }}>
            <main className={classNames(classes.content)}>
                <Dashboard />
            </main>
          </Box>
        </Box>
        {/* </Container> */}
        </>
      
    );
};

export default withRoot(withStyles(styles)(Layout))
