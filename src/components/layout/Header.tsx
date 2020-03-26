import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
  useTheme
} from "@material-ui/core/styles";
import classNames from 'classnames';
import { Container, useMediaQuery } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
// import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

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
      height: "69px",
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
    }
  })
);

const CustomButton = withStyles((theme: Theme) => ({
  root: {
    height: "45px",
    padding: "2px 10px",
    color: "#fff",
    fontSize: "14px",
    backgroundColor: "#134B8E",
    textTransform: "none",
    fontWeight: 550,
    borderRadius: "8px",
    marginLeft: "40px",
    opacity: 1,
    "&:hover": {
      background: "#134B8E",
      transition: "all 1s"
    }
  }
}))(Button);

const CustomLinkButton = withStyles((theme: Theme) => ({
  root: {
    height: "auto",
    padding: "2px 10px",
    color: "#151965",
    fontSize: "12px",
    textTransform: "none",
    fontWeight: 550,
    minWidth: "40px",
    display: "flex"
  },
  label: {
    alignItems: "flex-end"
  }
}))(Button);

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      root: {
        height: "112px"
      }
    },
    MuiContainer: {
      root: {
        height: "112px"
      }
    }
  }
});

interface ISidebarProps extends WithTranslation {
  leftDrawerOpen: any;
  setLeftDrawerOpen: any;
  direction: any;
  setDirection: any;
  t: any;
}

const Header: React.FC<ISidebarProps> = ({ leftDrawerOpen, setLeftDrawerOpen, direction, setDirection, t, i18n }) => {
  const classes = useStyles();
  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));
  const {language} = i18n
  const updateMirrorView = () => {
    i18n.changeLanguage(language === 'ar'? 'en': 'ar')
    setDirection(direction==="ltr"? "rtl": "ltr")
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppBar position="fixed"
       className={classNames(
        classes.root,
        fullScreen && classes.smAppbar
      )}>
        <Container
          fixed
          className="display-flex"
          style={{ alignItems: "center" }}
        >
          <Toolbar style={{ flexGrow: 1 }}>
          {fullScreen ?
            <IconButton
              color="primary"
              aria-label="Open drawer"
              onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
              style={{ marginLeft: -12, marginRight: 20 }}
            >
              <MenuIcon />
            </IconButton> 
            : null }
            <img src={"./brand.svg"} className={classes.logo} alt="luqta" onClick={() => { 
               updateMirrorView();
              }} />
            {!fullScreen ? (
              <CustomButton
                variant="contained"
                size="small"
                color="primary"
                href="#contained-buttons"
                style={{ marginRight: "40px"}}
              >
                <AddBoxOutlinedIcon className={classes.IconCss} /> &nbsp; {t("post_and_ad")}
              </CustomButton>
            ) : null}
          </Toolbar>
          {!fullScreen ? (
            <Toolbar
              className="display-flex-grow-1"
              style={{ justifyContent: "flex-end" }}
            >
              <div className={classes.otherIcons}>
                <CustomLinkButton>
                  <ForumIcon className={classes.IconCss} />
                </CustomLinkButton>
              </div>
              <div className={classes.otherIcons}>
                <CustomLinkButton>
                  <NotificationsNoneIcon className={classes.IconCss} />
                </CustomLinkButton>
              </div>
              <div className={classes.otherIcons}>
                <CustomLinkButton>
                  <FavoriteBorderIcon className={classes.IconCss} />
                </CustomLinkButton>
              </div>
              <div className={classes.otherIcons}>
                <CustomLinkButton>
                  <CommentIcon className={classes.IconCss} />
                </CustomLinkButton>
              </div>
              <div className={classes.otherIcons}>
                <CustomLinkButton>
                  <PermIdentityIcon className={classes.IconCss} />
                </CustomLinkButton>
              </div>
            </Toolbar>
          ) : null}
        </Container>
      </AppBar>
    </MuiThemeProvider>
  );
};

export default withTranslation("/dashboard/dashboard")(Header);