import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Formik, ErrorMessage} from 'formik';
import { withTranslation } from "react-i18next";
import { compose } from 'redux';
import * as Yup from 'yup';
import { MuiThemeProvider, createMuiTheme, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, useMediaQuery, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Link as Rlink } from "react-router-dom";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import { CircularProgress } from '@material-ui/core';
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
    },
    errMessage: {
      color: 'red',
      marginBottom: 5
    },
    cirProgress: {
      color: 'white'
    },
    alert: {
      margin: '0px 10px'
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

const SignUp: React.FC = (props) => {
// class MySignInc extends React.Component<RouteComponentProps<any>, {}> {
  // state = { 'siteId': '', username: '', password: '', loading: false, goToDashboard: false }
  const { i18n, t } : any = props;
  const {language} : any = i18n;

  console.log('props', language)
  const classes = useStyles();
  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));  
  const [direction, setDirection] = React.useState(language ==="ar"?"rtl" : "ltr");

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

  function Alert(props : any) {
    return <div>
        <MuiAlert elevation={6} variant="filled" {...props} />;
    </div>
  }
  const [message, setMessage] = useState('تمت الاضافة بنجاح')
  const [open, setOpen] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenErr(false)
  };

  const updateMirrorView = () => {
    i18n.changeLanguage(language === 'ar'? 'en': 'ar')
    setDirection(direction==="ltr"? "rtl": "ltr")
  }

  useEffect(() => {
    if (direction) {
      let body: any = document.getElementsByTagName("body");
      body[0].style.direction = direction;
    }
  }, [direction])

  const [waiting, setWaiting] = useState(false)
  // const [password, setPassword] = useState('')
  // const handleChange: any = (e: { target: { value: React.SetStateAction<string>; }; })=> {
  //   setPassword(e.target.value)
  // }

  interface MyFormValues {
    name: string;
    login: string;
    password: string;
    password_confirmation: string;
  }
  const initialValues: MyFormValues = { name: '', login: '', password: '', password_confirmation: '' };
  const validateYupSchema = ()=> Yup.object().shape<MyFormValues>({
    name: Yup.string().required('name_is_required').min(10).max(300),
    login: Yup.string().required ('email_is_required'),
    password: Yup.string().required('password_is_required').min(8).max(20),
    password_confirmation: Yup.string().required('password_is_required').min(6).max(20)
    // .oneOf([password], 'Passwords are not the same!')
  })

    return (
      <MuiThemeProvider theme={theme}>
        <Formik 
        initialValues={initialValues}
        onSubmit={(values) => {
          setWaiting(true)
          axios.post('http://134.122.75.39/jo/account/register', values)
          .then(res => {
            console.log(res)
            setWaiting(false)
            if(res.status === 201) {
              setMessage('the_user_has_added_successfuly')
              setOpen(true)
            }
          })
          .catch(err => {
            const errors : any = err.response.data.errors
            console.log(err.response)
            setWaiting(false)
            if(err.response.status === 422) {
              // if(errors.login !== undefined) {
              //   setMessage('Please enter a valid phone number or a valid email')
              //   setOpenErr(true)
              // }
              if(errors.password !== undefined) {
                setMessage('The password confirmation does not match')
                setOpenErr(true)
              }
              else {
                setMessage('Please enter a valid phone number or a valid email')
                setOpenErr(true)
            }
            }
            if(err.response.status === 500) {
              setMessage('somthinf went wrong with the server, Please try again')
              setOpenErr(true)
            }
          })
        }}
        validationSchema={validateYupSchema}
        render={
          (props)=> {
            return <React.Fragment>
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
                  {t("welcome_to_luqta")}
                  </Typography>

                  <form onSubmit={props.handleSubmit}>
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
                          <div>{t("register_google")}</div>
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
                        <div>{t("register_facebook")}</div>
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
                         <div>{t("register_twitter")}</div>
                      </div>
                  </Button>
                  <h2 className="textwithline"><span> {t("or")} </span></h2>
                  <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                      placeholder={t("name")}
                      fullWidth
                      id="username"
                      label={t("name")}
                      name="name"
                      // autoComplete="email"
                      onChange={props.handleChange}
                      // onChange={handleInputChange}
                      autoFocus
                    />
                    <div className={classes.errMessage}>
                        <ErrorMessage  name="name"/>
                      </div>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                      placeholder={t("email_or_Phone")}
                      fullWidth
                      id="useremail"
                      label={t("email_or_Phone")}
                      name="login"
                      autoComplete="email"
                      onChange={props.handleChange}
                      // onChange={this.handleInputChange}
                      autoFocus
                    />
                    <div className={classes.errMessage}>
                        <ErrorMessage  name="login"/>
                      </div>
                    <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                      placeholder={t("password")}
                      fullWidth
                      name="password"
                      label={t("password")}
                      type="password"
                      // id="password"
                      // autoComplete="current-password"
                      onChange={props.handleChange}
                      // onChange={this.handleInputChange}
                      // onKeyDown={this.handleKeyDown}
                    />
                      <div className={classes.errMessage}>
                        <ErrorMessage  name="password"/>
                      </div>
                      <TextField
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      margin="normal"
                      placeholder={t("password_confirm")}
                      fullWidth
                      name="password_confirmation"
                      label={t("password_confirm")}
                      type="password"
                      // id="password"
                      // autoComplete="current-password"
                      onChange={props.handleChange}
                      // onChange={this.handleInputChange}
                      // onKeyDown={this.handleKeyDown}
                    />
                      <div className={classes.errMessage}>
                        <ErrorMessage  name="password_confirmation"/>
                      </div>
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
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      className="signbtncss"
                      // disabled={this.state.loading}
                      // onClick={() => { this.chkLogin() }}
                    >
                      {
                        waiting ? <CircularProgress className={classes.cirProgress}/>
                        :
                        t("signup")
                      }
                  </Button>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="success">
                        <div className={classes.alert}>
                        {message}
                        </div>
                      </Alert>
                  </Snackbar>
                  <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
                      <Alert onClose={handleClose} severity="error">
                      <div className={classes.alert}>
                        {message}
                        </div>
                      </Alert>
                  </Snackbar>
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
                  <span style={{ color: "#8E8E8E" }}>{t("already_have_account")}</span> <Rlink to="/signin" style={{ color: "#134B8E" }}>{t("signin")}</Rlink>
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
            </React.Fragment>
          }
        }
        />
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
// export default withRoot(withStyles(styles)(withTranslation("auth/auth"))(SignUp));
const connectedSignIn : any = compose(
  withStyles(styles),
  withTranslation("auth/auth"),
)(SignUp);

export default withRoot(connectedSignIn);