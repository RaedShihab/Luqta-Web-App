import React, { useEffect } from 'react';
import { MuiThemeProvider, createMuiTheme, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, useMediaQuery } from '@material-ui/core';
import { Link as Rlink } from "react-router-dom";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import { CircularProgress } from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  useTheme
} from "@material-ui/core/styles";
import classNames from 'classnames';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withRoot from '../../withRoot';
import './auth.css'
import GoogleIcon from '../../assets/google-favicon.png';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
// import { promisify } from 'util';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
      backgroundColor: "#fff"
    },
    smAppbar: {
      height: "90px"
    },
    logo: {
      width: "95px",
      height: "50px",
      cursor: "pointer"
    },
    IconCss: {
      height: "2.4rem",
      position: "relative",
      textAlign: "center"
    },
    iconRtl: {
      marginRight: "40px"
    },
    resercher: {
      height: "100%",
      display: "flex",
      alignItems: "normal",
      borderBottom: "3px solid #f56b2a"
    },
    otherIcons: {
      display: "flex",
      flexDirection: "column",
      fontSize: "11px",
      textAlign: "center",
      backgroundColor: "#DFE4E8",
      marginRight: "20px",
      width: "50px",
      height: "50px",
      background: "#DFE4E8 0% 0% no-repeat padding-box",
      borderRadius: "10px",
      opacity: "1",
      justifyContent: "center"
    },
    socialLoginBtn: {
      marginBottom: "10px",
      backgroundColor: "#FFF",
      textTransform: "none",
      fontFamily: "Roboto",
      fontWeight: 500,
    },
    googleLoginBtn: {
      backgroundColor: "#FFF",
      color: "#4A4A4A",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "3px 3px 5px #00000029",
      border: "1px solid #707070",
      borderRadius: "4px",
      '&:hover': {
        backgroundColor: "#FFFFFF"
      }
    },
    fbLoginBtn: {
      backgroundColor: "#3C5A99",
      color: "#FFF",
      background: "#3C5A99 0% 0% no-repeat padding-box",
      boxShadow: "3px 3px 5px #00000029",
      borderRadius: "4px",
      '&:hover': {
        backgroundColor: "#3C5A99"
      }
    },
    twitterLoginBtn: {
      backgroundColor: "#2CC0F9",
      color: "#FFF",
      background: "#2CC0F9 0% 0% no-repeat padding-box",
      boxShadow: "0px 0px 5px #00000029",
      borderRadius: "4px",
      '&:hover': {
        backgroundColor: "#2CC0F9"
      }
    }
  })
);

export const styles = (theme: Theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#9c27b0',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    progress: { display: 'flex', justifyContent: 'center' }
  });

  const CustomButton = withStyles((theme: Theme) => ({
    root: {
      height: "50px",
      padding: "2px 40px",
      fontSize: "14px",
      fontWeight: 500,
      backgroundColor: "#134B8E",
      textTransform: "none",
      borderRadius: "6px",
      opacity: 1,
      "&:hover": {
        background: "#134B8E",
        transition: "all 1s"
      }
    }
  }))(Button);

const SignUp: React.FC = () => {
// class MySignInc extends React.Component<RouteComponentProps<any>, {}> {
  // state = { 'siteId': '', username: '', password: '', loading: false, goToDashboard: false }

  const classes = useStyles();
  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));  
  const [direction, setDirection] = React.useState("ltr");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        direction: direction === "ltr" ? "ltr" : "rtl",
        palette: {
          primary: {
              main: "#134B8E",
          },
        },
        overrides: {
          MuiAppBar: {
            root: {
              height: "85px",
              boxShadow: "0px 1px 12px #0000001C"
            }
          },
          MuiContainer: {
            root: {
              height: "112px"
            }
          },
          MuiToolbar: {
            dense: {
              minHeight: "112px"
            }
          },
          MuiFormControlLabel: {
            label:{
              fontSize: "12px",
              // color: "#134B8E",
              opacity: 0.82
            }
          }
        }
      }),
    [direction],
  );

  const updateMirrorView = () => {
    if (direction === "ltr") 
        setDirection("rtl");
    else  
        setDirection("ltr");
  }

  useEffect(() => {
    if (direction) {
      let body: any = document.getElementsByTagName("body");
      body[0].style.direction = direction;
    }
  }, [direction])

    return (
      <MuiThemeProvider theme={theme}>
      <AppBar position="fixed"
       className={classNames(
        classes.root,
        fullScreen && classes.smAppbar
      )}>
        <Container
          fixed={false}
          className="display-flex"
          style={{ alignItems: "center", maxWidth: "100%" }}
        >
          <Toolbar style={{ flexGrow: 1 }}>
            <img src={"./brand.svg"} onClick={() => updateMirrorView() } className={classes.logo} alt="luqta" />
          </Toolbar>
            <Toolbar
              className="display-flex-grow-1"
              style={{ justifyContent: "flex-end" }}
            >
              <nav>
              <CustomButton
                variant="contained"
                size="large"
                color="primary"
                href="/signin"
              >
                 Sign in
              </CustomButton>
              </nav>
            </Toolbar>          
        </Container>
      </AppBar>
      <Toolbar variant="dense"  className={classNames( fullScreen && classes.smAppbar)} />
        <Container style={{ alignItems: "center", maxWidth: "100%" }}>
          <CssBaseline />
          {!  fullScreen && <Toolbar variant="dense" style={{ minHeight: "50px" }} />}
          <Grid container spacing={2} direction="row">
            <Grid item lg={12} md={12} xs={12}>
              <Container component="main" maxWidth="xs" style={{ width: !fullScreen ? "68%" : "100%" }}>
                <CssBaseline />
                <div>
                  <Typography component="h1" variant="h5" className="luqta-title">
                  Welcome to Luqta!
                  </Typography>

                  <form noValidate>
                  <Button
                      type="button"
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classNames(classes.socialLoginBtn, classes.googleLoginBtn)}
                      // disabled={this.state.loading}
                      // onClick={() => { this.chkLogin() }}
                    >
                      <div style={{ width: "100%" }}>
                        <img src={GoogleIcon} style={{ float:"left" }} alt="google" />
                        <div>Register with Google</div>
                    </div>
                  </Button>
                  <Button
                      type="button"
                      fullWidth
                      size="large"
                      variant="contained"
                      color="primary"
                      className={classNames(classes.socialLoginBtn, classes.fbLoginBtn)}
                      // disabled={this.state.loading}
                      // onClick={() => { this.chkLogin() }}
                    >
                      <div style={{ width: "100%" }}>
                        <FacebookIcon style={{ float:"left" }} />
                        <div>Register with Facebook</div>
                      </div>
                  </Button>
                  <Button
                      type="button"
                      size="large"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classNames(classes.socialLoginBtn, classes.twitterLoginBtn)}
                      // disabled={this.state.loading}
                      // onClick={() => { this.chkLogin() }}
                    >
                      <div style={{ width: "100%" }}>
                        <TwitterIcon style={{ float:"left" }} />
                        <div>Register with Twitter</div>
                      </div>
                  </Button>
                  <h2 className="textwithline"><span> or </span></h2>
                  <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                      placeholder="Name"
                      fullWidth
                      id="username"
                      label="Name"
                      name="name"
                      autoComplete="email"
                      // onChange={this.handleInputChange}
                      autoFocus
                    />
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                      placeholder="Email or Phone"
                      fullWidth
                      id="useremail"
                      label="Email or Phone"
                      name="username"
                      autoComplete="email"
                      // onChange={this.handleInputChange}
                      autoFocus
                    />
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                      placeholder="password"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      // onChange={this.handleInputChange}
                      // onKeyDown={this.handleKeyDown}
                    />
                    {/* <div className="display-flex align-center" style={{ marginBottom: "20px" }}>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        style={{ float: "left", color: "#134B8E", }}
                      />
                      <Link href="#" className="forgatePwd" variant="body2" style={{ flexGrow: 1, textAlign: "end" }}>
                        Forgot password?
                      </Link>
                    </div> */}
                    <div style={{ marginBottom: "20px" }}></div>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      className="signbtncss"
                      // disabled={this.state.loading}
                      // onClick={() => { this.chkLogin() }}
                    >
                      Sign Up
                  </Button>
                  <div style={{ marginBottom: "5px" }}></div>
                    {/* <div className="display-flex" style={{ justifyContent: "center", marginBottom: "20px" }}>
                        <FormControlLabel
                          control={<Checkbox value="remember"  color="primary" />}
                          label="I accept terms and condition"
                          style={{ fontSize: "12px", color: "#555E67" }}
                        />                
                      <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Notification"
                          style={{ fontSize: "12px", color: "#555E67" }}
                        />
                    </div> */}
                    <br/>
                    <div style={{ textAlign: "center", fontFamily: "Roboto", fontSize: "13px", fontWeight: 400 }}>
                      <span style={{ color: "#8E8E8E" }}>Already have an account?</span> <Rlink to="/signin" style={{ color: "#134B8E" }}>Sign in</Rlink>
                    </div>
                  </form>
                </div>

                <Box mt={3}>
                <Copyright />
              </Box>
            </Container>
            </Grid>
        </Grid>
      </Container>
    </MuiThemeProvider>
    );  
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {new Date().getFullYear()}{' '}{'Copyright © '}
      <Link color="inherit" href="https://luqta-app.herokuapp.com/">
        Luqta | All Rights Reserved.
      </Link>
    </Typography>
  );
}
export default withRoot(withStyles(styles)(SignUp));
