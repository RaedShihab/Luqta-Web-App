import React from "react";
import { MuiThemeProvider, createMuiTheme, Grid, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import withRoot from "../../withRoot";
import { styles } from "./styles";
import '../common.css';

const FooterCategory: React.FC = () => {

  const theme = createMuiTheme({
    overrides: {
      MuiLink: {
        root: {
          color: "#134B8E"
        }
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Box display="flex" flexDirection="column" bgcolor="background.paper">
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerCategory">
              <li><Link color="primary" href="#">Emploi</Link> </li>
              <li><Link color="primary" href="#">Offres d'emploi</Link></li>
              <li><Link color="primary" href="#">Offres d'emploi Cadres</Link></li>
              <li><Link color="primary" href="#">Formations Professionnelles</Link></li>
              <li className="newLi"><Link color="primary" href="#">VÉHICULES</Link></li>
              <li><Link color="primary" href="#">Motos</Link></li>
              <li><Link color="primary" href="#">Caravaning</Link></li>
              <li><Link color="primary" href="#">Utilitaires</Link></li>
              <li><Link color="primary" href="#">Camions</Link></li>
              <li><Link color="primary" href="#">Nautisme</Link></li>
              <li><Link color="primary" href="#">Équipement auto</Link></li>
              <li><Link color="primary" href="#">Équipement moto</Link></li>
              <li><Link color="primary" href="#">Équipement caravaning</Link></li>
              <li><Link color="primary" href="#">Équipement nautisme</Link></li>
              <li className="newLi"><Link color="primary" href="#">IMMOBILIER</Link></li>
              <li><Link color="primary" href="#">Ventes immobilières</Link></li>
              <li><Link color="primary" href="#">Immobilier Neuf</Link></li>
              <li><Link color="primary" href="#">Locations</Link></li>
              <li><Link color="primary" href="#">Colocations</Link></li>
              <li><Link color="primary" href="#">Bureaux & Commerces</Link></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
          <ul className="footerCategory">
              <li> <Link color="primary" href="#">VACANCES</Link> </li>
              <li><Link color="primary" href="#">Locations & Gîtes</Link></li>
              <li><Link color="primary" href="#">Chambres d'hôtes</Link></li>
              <li><Link color="primary" href="#">Campings</Link></li>
              <li><Link color="primary" href="#">Hôtels</Link></li>
              <li><Link color="primary" href="#">Hébergements insolites</Link></li>
              <li><Link color="primary" href="#">Ventes privées vacances</Link></li>
              
              <li className="newLi"><Link color="primary" href="#">LOISIRS</Link></li>
              <li><Link color="primary" href="#">DVD - Films</Link></li>
              <li><Link color="primary" href="#">CD - Musique</Link></li>
              <li><Link color="primary" href="#">Utilitaires</Link></li>
              <li><Link color="primary" href="#">Livres</Link></li>
              <li><Link color="primary" href="#">Animaux</Link></li>
              <li><Link color="primary" href="#">Vélos</Link></li>
              <li><Link color="primary" href="#">Sports & Hobbies</Link></li>
              <li><Link color="primary" href="#">Instruments de musique</Link></li>
              <li><Link color="primary" href="#">Collection</Link></li>
              <li><Link color="primary" href="#">Jeux & Jouets</Link></li>
              <li><Link color="primary" href="#">Vins & Gastronomie</Link></li>              
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerCategory">
              <li> <Link color="primary" href="#">MODE</Link> </li>
              <li><Link color="primary" href="#">Vêtements</Link></li>
              <li><Link color="primary" href="#">Chaussures</Link></li>
              <li><Link color="primary" href="#">Accessoires & Bagagerie</Link></li>
              <li><Link color="primary" href="#">Montres & Bijoux</Link></li>
              <li><Link color="primary" href="#">Équipement bébé</Link></li>
              <li><Link color="primary" href="#">Vêtements bébé</Link></li>
              <li><Link color="primary" href="#">Luxe et Tendance</Link></li>
              
              <li className="newLi"><Link color="primary" href="#">MULTIMÉDIA</Link></li>
              <li><Link color="primary" href="#">Informatique</Link></li>
              <li><Link color="primary" href="#">Consoles & Jeux vidéo</Link></li>
              <li><Link color="primary" href="#">Image & Son</Link></li>
              <li><Link color="primary" href="#">Téléphonie</Link></li>

              <li className="newLi"><Link color="primary" href="#">SERVICES</Link></li>
              <li><Link color="primary" href="#">Prestations de services</Link></li>
              <li><Link color="primary" href="#">Billetterie</Link></li>
              <li><Link color="primary" href="#">Évènements</Link></li>
              <li><Link color="primary" href="#">Cours particuliers</Link></li>
              <li><Link color="primary" href="#">Covoiturage</Link></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerCategory">
              <li> <Link color="primary" href="#">MAISON</Link> </li>
              <li><Link color="primary" href="#">Ameublement</Link></li>
              <li><Link color="primary" href="#">Électroménager</Link></li>
              <li><Link color="primary" href="#">Arts de la table</Link></li>
              <li><Link color="primary" href="#">Décoration</Link></li>
              <li><Link color="primary" href="#">Linge de maison</Link></li>
              <li><Link color="primary" href="#">Bricolage</Link></li>
              <li><Link color="primary" href="#">Jardinage</Link></li>
              <li className="newLi"><Link color="primary" href="#">MATÉRIEL PROFESSIONNEL</Link></li>
              <li><Link color="primary" href="#">Matériel agricole</Link></li>
              <li><Link color="primary" href="#">Transport - Manutention</Link></li>
              <li><Link color="primary" href="#">BTP - Chantier gros-oeuvre</Link></li>
              <li><Link color="primary" href="#">Outillage - Matériaux 2nd-oeuvre</Link></li>
              <li><Link color="primary" href="#">Équipements industriels</Link></li>
              <li><Link color="primary" href="#">Restauration - Hôtellerie</Link></li>
              <li><Link color="primary" href="#">Fournitures de bureau</Link></li>
              <li><Link color="primary" href="#">Commerces & Marchés</Link></li>
              <li><Link color="primary" href="#">Matériel médical</Link></li>
              <li className="newLi"><Link color="primary" href="#">DIVERS</Link></li>
              <li><Link color="primary" href="#">Autres</Link></li>
            </ul>
          </Grid>
        </Grid>
      </Box>
    </MuiThemeProvider>
  );
};

export default withRoot(withStyles(styles)(FooterCategory));
