import React from "react";
import { MuiThemeProvider, useMediaQuery, Grid, Link, createMuiTheme } from "@material-ui/core";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import withRoot from "../../withRoot";
import { styles } from "./styles";
import '../common.css';

const Footer: React.FC = () => {
  // const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));

  const theme = createMuiTheme({
    overrides: {
      MuiLink: {
        root: {
          color: "#FFF"
        }
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" bgcolor="#474747" color="#fff">
        {!fullScreen ? 
          <>
          <Grid container spacing={2}>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerMenu">
              <li><Link href="#">à propos du boncoin</Link> </li>
              <li><Link href="#">Qui sommes-nous ?</Link></li>
              <li><Link href="#">Nous rejoindre</Link></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
          <ul className="footerMenu">
              <li> <Link href="#">INFORMATIONS LÉGALES</Link> </li>
              <li><Link href="#">Conditions générales d’utilisation</Link></li>
              <li><Link href="#">Règles de diffusion, de référencement et de déréférencement</Link></li>
              <li><Link href="#">Conditions Générales de Vente</Link></li>
              <li><Link href="#">Vie privée / cookies</Link></li>
              <li><Link href="#">Vos droits et obligations</Link></li>
              <li><Link href="#">Critères de classement</Link></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerMenu">
              <li><Link href="#">NOS SOLUTIONS PROS</Link> </li>
              <li><Link href="#">Publicité</Link></li>
              <li><Link href="#">Professionnels de l’immobilier</Link></li>
              <li><Link href="#">Vos recrutements</Link></li>
              <li><Link href="#">Professionnels de l’auto</Link></li>
              <li><Link href="#">Autres solutions professionnelles</Link></li>
              <li><Link href="#">Annuaire des professionnels</Link></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerMenu">
              <li> <Link href="#">DES QUESTIONS ?</Link> </li>
              <li><Link href="#">Aide</Link></li>
              <li><Link href="#">Le service de paiement sécurisé et la livraison</Link></li>
              <li><Link href="#">Demandez conseil à la Communauté</Link></li>
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
