import React from "react";
import classNames from "classnames";
import { MuiThemeProvider, createMuiTheme, useMediaQuery, Grid } from "@material-ui/core";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { CssBaseline, Toolbar } from "@material-ui/core";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../views/Dashboard";
import Box from "@material-ui/core/Box";
import withRoot from "../../withRoot";
import { styles } from "./styles";
import '../common.css';

const Footer: React.FC = () => {
  // const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));

  return (
    <MuiThemeProvider theme={muitheme}>
      <Box display="flex" flexDirection="column" bgcolor="#474747" color="#fff">
        {!fullScreen ? 
          <>
          <Grid container spacing={2}>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerMenu">
              <li> <a>à propos du boncoin</a> </li>
              <li><a>Qui sommes-nous ?</a></li>
              <li><a>Nous rejoindre</a></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
          <ul className="footerMenu">
              <li> <a>INFORMATIONS LÉGALES</a> </li>
              <li><a>Conditions générales d’utilisation</a></li>
              <li><a>Règles de diffusion, de référencement et de déréférencement</a></li>
              <li><a>Conditions Générales de Vente</a></li>
              <li><a>Vie privée / cookies</a></li>
              <li><a>Vos droits et obligations</a></li>
              <li><a>Critères de classement</a></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerMenu">
              <li> <a>NOS SOLUTIONS PROS</a> </li>
              <li><a>Publicité</a></li>
              <li><a>Professionnels de l’immobilier</a></li>
              <li><a>Vos recrutements</a></li>
              <li><a>Professionnels de l’auto</a></li>
              <li><a>Autres solutions professionnelles</a></li>
              <li><a>Annuaire des professionnels</a></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerMenu">
              <li> <a>DES QUESTIONS ?</a> </li>
              <li><a>Aide</a></li>
              <li><a>Le service de paiement sécurisé et la livraison</a></li>
              <li><a>Demandez conseil à la Communauté</a></li>
             </ul>
          </Grid>
        </Grid>
          <span className="footerLuqta"></span>
          </>
        : null}
        <div className="display-flex" style={{ justifyContent: "space-between", height: "40px", alignItems: "center" }}>
          <span>Luqta {'Copyright © '} 2020</span>
          <div className="_1JqBX"><span className="_1u8Yi _3klmW">Retrouvez-nous sur</span></div></div>
      </Box>
    </MuiThemeProvider>
  );
};

export default withRoot(withStyles(styles)(Footer));
