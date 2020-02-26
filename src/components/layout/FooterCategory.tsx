import React from "react";
import { MuiThemeProvider, createMuiTheme, Grid, Link } from "@material-ui/core";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import withRoot from "../../withRoot";
import { styles } from "./styles";
import '../common.css';

const FooterCategory: React.FC = () => {

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
      <Box display="flex" flexDirection="column" bgcolor="background.paper">
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerCategory">
              <li><Link href="#">Emploi</Link> </li>
              <li><Link href="#">Offres d'emploi</Link></li>
              <li><Link href="#">Offres d'emploi Cadres</Link></li>
              <li><Link href="#">Formations Professionnelles</Link></li>
              <li className="newLi"><Link href="#">VÉHICULES</Link></li>
              <li><Link href="#">Motos</Link></li>
              <li><Link href="#">Caravaning</Link></li>
              <li><Link href="#">Utilitaires</Link></li>
              <li><Link href="#">Camions</Link></li>
              <li><Link href="#">Nautisme</Link></li>
              <li><Link href="#">Équipement auto</Link></li>
              <li><Link href="#">Équipement moto</Link></li>
              <li><Link href="#">Équipement caravaning</Link></li>
              <li><Link href="#">Équipement nautisme</Link></li>
              <li className="newLi"><Link href="#">IMMOBILIER</Link></li>
              <li><Link href="#">Ventes immobilières</Link></li>
              <li><Link href="#">Immobilier Neuf</Link></li>
              <li><Link href="#">Locations</Link></li>
              <li><Link href="#">Colocations</Link></li>
              <li><Link href="#">Bureaux & Commerces</Link></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
          <ul className="footerCategory">
              <li> <Link href="#">VACANCES</Link> </li>
              <li><Link href="#">Locations & Gîtes</Link></li>
              <li><Link href="#">Chambres d'hôtes</Link></li>
              <li><Link href="#">Campings</Link></li>
              <li><Link href="#">Hôtels</Link></li>
              <li><Link href="#">Hébergements insolites</Link></li>
              <li><Link href="#">Ventes privées vacances</Link></li>
              
              <li className="newLi"><Link href="#">LOISIRS</Link></li>
              <li><Link href="#">DVD - Films</Link></li>
              <li><Link href="#">CD - Musique</Link></li>
              <li><Link href="#">Utilitaires</Link></li>
              <li><Link href="#">Livres</Link></li>
              <li><Link href="#">Animaux</Link></li>
              <li><Link href="#">Vélos</Link></li>
              <li><Link href="#">Sports & Hobbies</Link></li>
              <li><Link href="#">Instruments de musique</Link></li>
              <li><Link href="#">Collection</Link></li>
              <li><Link href="#">Jeux & Jouets</Link></li>
              <li><Link href="#">Vins & Gastronomie</Link></li>              
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerCategory">
              <li> <Link href="#">MODE</Link> </li>
              <li><Link href="#">Vêtements</Link></li>
              <li><Link href="#">Chaussures</Link></li>
              <li><Link href="#">Accessoires & Bagagerie</Link></li>
              <li><Link href="#">Montres & Bijoux</Link></li>
              <li><Link href="#">Équipement bébé</Link></li>
              <li><Link href="#">Vêtements bébé</Link></li>
              <li><Link href="#">Luxe et Tendance</Link></li>
              
              <li className="newLi"><Link href="#">MULTIMÉDIA</Link></li>
              <li><Link href="#">Informatique</Link></li>
              <li><Link href="#">Consoles & Jeux vidéo</Link></li>
              <li><Link href="#">Image & Son</Link></li>
              <li><Link href="#">Téléphonie</Link></li>

              <li className="newLi"><Link href="#">SERVICES</Link></li>
              <li><Link href="#">Prestations de services</Link></li>
              <li><Link href="#">Billetterie</Link></li>
              <li><Link href="#">Évènements</Link></li>
              <li><Link href="#">Cours particuliers</Link></li>
              <li><Link href="#">Covoiturage</Link></li>
            </ul>
          </Grid>
          <Grid item lg={3} md={3} xs={12}>
            <ul className="footerCategory">
              <li> <Link href="#">MAISON</Link> </li>
              <li><Link href="#">Ameublement</Link></li>
              <li><Link href="#">Électroménager</Link></li>
              <li><Link href="#">Arts de la table</Link></li>
              <li><Link href="#">Décoration</Link></li>
              <li><Link href="#">Linge de maison</Link></li>
              <li><Link href="#">Bricolage</Link></li>
              <li><Link href="#">Jardinage</Link></li>
              <li className="newLi"><Link href="#">MATÉRIEL PROFESSIONNEL</Link></li>
              <li><Link href="#">Matériel agricole</Link></li>
              <li><Link href="#">Transport - Manutention</Link></li>
              <li><Link href="#">BTP - Chantier gros-oeuvre</Link></li>
              <li><Link href="#">Outillage - Matériaux 2nd-oeuvre</Link></li>
              <li><Link href="#">Équipements industriels</Link></li>
              <li><Link href="#">Restauration - Hôtellerie</Link></li>
              <li><Link href="#">Fournitures de bureau</Link></li>
              <li><Link href="#">Commerces & Marchés</Link></li>
              <li><Link href="#">Matériel médical</Link></li>
              <li className="newLi"><Link href="#">DIVERS</Link></li>
              <li><Link href="#">Autres</Link></li>
            </ul>
          </Grid>
        </Grid>
      </Box>
    </MuiThemeProvider>
  );
};

export default withRoot(withStyles(styles)(FooterCategory));
