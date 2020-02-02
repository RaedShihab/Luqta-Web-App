import React from 'react';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexGrow: 1,
      backgroundColor: "#fff"
    },
    title: {
      fontWeight: 600,
      marginRight: "2rem",
      color: "#ff6600"
    },
    IconCss: {
      height: "2.4rem",
      marginRight: "5px",
      position: "relative",
      textAlign: "center",
      width: "2rem",
    },
    resercher: {
      height: "100%",
      display: "flex",
      alignItems: "normal",
      borderBottom: "3px solid #f56b2a",
    },
    otherIcons: {
      height: "100%",
      color: "#000",
      display: "flex",
      flexDirection: "column",
      fontSize: "11px",
      textAlign: "center",
      '&:hover': {
        borderBottom: "3px solid #f56b2a"
      },
    }
  }),
);

const CustomButton = withStyles((theme: Theme) => ({
  root: {
    height: "auto",
    padding: "0px 10px",
    color: "#fff",
    fontSize: "1rem",
    backgroundColor: "#f56b2a",
    textTransform: "none",
    fontWeight: 550,
    marginRight: "10px",
    '&:hover': {
      background: "#c0562a",
      transition: "all 1s"
    },
  },
}))(Button);

const CustomLinkButton = withStyles((theme: Theme) => ({
  root: {
    height: "auto",
    padding: "0px 10px",
    color: "#000",
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: 550,
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    // position: "relative",
    '&:hover': {
      background: "#fff",
    },
  },
  label: {
    alignItems: "flex-end",
  }
}))(Button);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
      <AppBar position="fixed" className={classes.root}>
        <Container fixed style={{ display: "flex"}}>
          <Toolbar style={{ flexGrow: 1 }}>
            <Typography variant="h4" className={classes.title}>
              Leboncoin
            </Typography>
            <CustomButton variant="contained" color="primary" href="#contained-buttons">
              <AddBoxOutlinedIcon className={classes.IconCss} /> Déposer une annonce
            </CustomButton>
            <div className={classes.resercher}>
              <CustomLinkButton href="#contained-buttons">
                <SearchOutlinedIcon className={classes.IconCss} /> 
                <span>Rechercher</span>
              </CustomLinkButton>
            </div>
          </Toolbar>
          <Toolbar style={{ flexGrow: 1 }}>
             <div className={classes.otherIcons}>
                <CustomLinkButton href="#contained-notify">
                  <NotificationsNoneIcon className={classes.IconCss} />                  
                </CustomLinkButton>
                <span>Mes recherches</span>
             </div>
             <div className={classes.otherIcons}>
                <CustomLinkButton href="#contained-notify">
                  <FavoriteBorderIcon className={classes.IconCss} />                  
                </CustomLinkButton>
                <span>Favoris</span>
             </div>
             <div className={classes.otherIcons}>
                <CustomLinkButton href="#contained-notify">
                  <NotificationsNoneIcon className={classes.IconCss} />                  
                </CustomLinkButton>
                <span>Mes recherches</span>
             </div>
             <div className={classes.otherIcons}>
                <CustomLinkButton href="#contained-notify">
                  <CommentIcon className={classes.IconCss} />                  
                </CustomLinkButton>
                <span>Messages</span>
             </div>
            <div className={classes.otherIcons}>
                <CustomLinkButton href="#contained-notify">
                  <PermIdentityIcon className={classes.IconCss} />                  
                </CustomLinkButton>
                <span>User</span>
             </div>
          </Toolbar>
          </Container>
        </AppBar>
  );
}

export default Header;