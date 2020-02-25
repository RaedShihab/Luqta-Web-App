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

const FooterCategory: React.FC = () => {
  const [leftDrawerOpen, setLeftDrawerOpen] = React.useState(false);
  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));

  return (
    <MuiThemeProvider theme={muitheme}>
      <Box display="flex" flexDirection="column" bgcolor="background.paper">
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerCategory">
              <li> <a>Emploi</a> </li>
              <li><a>Offres d'emploi</a></li>
              <li><a>Offres d'emploi Cadres</a></li>
              <li><a>Formations Professionnelles</a></li>
              <li className="newLi"><a>VÉHICULES</a></li>
              <li><a>Motos</a></li>
              <li><a>Caravaning</a></li>
              <li><a>Utilitaires</a></li>
              <li><a>Camions</a></li>
              <li><a>Nautisme</a></li>
              <li><a>Équipement auto</a></li>
              <li><a>Équipement moto</a></li>
              <li><a>Équipement caravaning</a></li>
              <li><a>Équipement nautisme</a></li>
              <li className="newLi"><a>IMMOBILIER</a></li>
              <li><a>Ventes immobilières</a></li>
              <li><a>Immobilier Neuf</a></li>
              <li><a>Locations</a></li>
              <li><a>Colocations</a></li>
              <li><a>Bureaux & Commerces</a></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
          <ul className="footerCategory">
              <li> <a>VACANCES</a> </li>
              <li><a>Locations & Gîtes</a></li>
              <li><a>Chambres d'hôtes</a></li>
              <li><a>Campings</a></li>
              <li><a>Hôtels</a></li>
              <li><a>Hébergements insolites</a></li>
              <li><a>Ventes privées vacances</a></li>
              
              <li className="newLi"><a>LOISIRS</a></li>
              <li><a>DVD - Films</a></li>
              <li><a>CD - Musique</a></li>
              <li><a>Utilitaires</a></li>
              <li><a>Livres</a></li>
              <li><a>Animaux</a></li>
              <li><a>Vélos</a></li>
              <li><a>Sports & Hobbies</a></li>
              <li><a>Instruments de musique</a></li>
              <li><a>Collection</a></li>
              <li><a>Jeux & Jouets</a></li>
              <li><a>Vins & Gastronomie</a></li>              
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerCategory">
              <li> <a>MODE</a> </li>
              <li><a>Vêtements</a></li>
              <li><a>Chaussures</a></li>
              <li><a>Accessoires & Bagagerie</a></li>
              <li><a>Montres & Bijoux</a></li>
              <li><a>Équipement bébé</a></li>
              <li><a>Vêtements bébé</a></li>
              <li><a>Luxe et Tendance</a></li>
              
              <li className="newLi"><a>MULTIMÉDIA</a></li>
              <li><a>Informatique</a></li>
              <li><a>Consoles & Jeux vidéo</a></li>
              <li><a>Image & Son</a></li>
              <li><a>Téléphonie</a></li>

              <li className="newLi"><a>SERVICES</a></li>
              <li><a>Prestations de services</a></li>
              <li><a>Billetterie</a></li>
              <li><a>Évènements</a></li>
              <li><a>Cours particuliers</a></li>
              <li><a>Covoiturage</a></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerCategory">
              <li> <a>MAISON</a> </li>
              <li><a>Ameublement</a></li>
              <li><a>Électroménager</a></li>
              <li><a>Arts de la table</a></li>
              <li><a>Décoration</a></li>
              <li><a>Linge de maison</a></li>
              <li><a>Bricolage</a></li>
              <li><a>Jardinage</a></li>
              <li className="newLi"><a>MATÉRIEL PROFESSIONNEL</a></li>
              <li><a>Matériel agricole</a></li>
              <li><a>Transport - Manutention</a></li>
              <li><a>BTP - Chantier gros-oeuvre</a></li>
              <li><a>Outillage - Matériaux 2nd-oeuvre</a></li>
              <li><a>Équipements industriels</a></li>
              <li><a>Restauration - Hôtellerie</a></li>
              <li><a>Fournitures de bureau</a></li>
              <li><a>Commerces & Marchés</a></li>
              <li><a>Matériel médical</a></li>
              <li className="newLi"><a>DIVERS</a></li>
              <li><a>Autres</a></li>
            </ul>
          </Grid>
        </Grid>
      </Box>
    </MuiThemeProvider>
  );
};

export default withRoot(withStyles(styles)(FooterCategory));
