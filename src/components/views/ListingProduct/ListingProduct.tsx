import React from "react";
import classNames from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import Product from "../../../assets/product.png";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CallIcon from "@material-ui/icons/Call";
import "./Listing.css";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > span": {
        margin: theme.spacing(2)
      },
      flexGrow: 1
    },
    cardHover: {
      "&:hover": {
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: "0px 8px 17px #00000029",
        opacity: 1
      }
    },
    paper: {
      height: "200px",
      border: "0.5px solid #D4D4D4",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 8px 17px #00000029",
      opacity: 1
    },
    image: {
      width: 200
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    },
    iconButton: {
      color: "#fff",
      background: "#134B8E 0% 0% no-repeat padding-box",
      padding: "6px",
      marginLeft: "6px",
      "&:hover": {
        color: "#fff",
        background: "#134B8E 0% 0% no-repeat padding-box"
      }
    }
  })
);
const ListingProduct: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className={classes.root}>
      <Card className={classes.cardHover}>
        <CardContent className={classNames(fullScreen && "rescardContent")}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} xs={4}>
              <ButtonBase style={{ width: "auto" }}>
                <img className={classes.img} alt="listProduct" src={Product} />
              </ButtonBase>
            </Grid>
            <Grid item lg={9} md={9} xs={8} sm container>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <div
                    className={classNames(
                      !fullScreen && "cardheader display-flex",
                      fullScreen && "resCardheader"
                    )}
                  >
                    <div>
                      <Typography
                        gutterBottom={!fullScreen}
                        variant="subtitle1"
                      >
                        New house open view not overlooked
                      </Typography>
                    </div>
                    <Typography
                      variant="subtitle1"
                      style={{ color: "#FF0033" }}
                    >
                      $31,000 - $35,000
                    </Typography>
                  </div>
                </Grid>
                <div
                  className={classNames(
                    !fullScreen && "cardheader display-flex"
                  )}
                >
                  <span className="display-flex align-center">
                    <AccessTimeIcon style={{ height: "16px", width: "16px" }} />{" "}
                    &nbsp;&nbsp; 12:00 AM
                  </span>
                </div>
                <Grid container>
                  <Grid item md={2} xs={4}>
                    <div
                      className={classNames(!fullScreen && "locationCategory")}
                    >
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        className="locationInfo"
                      >
                        City:
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item md={8} xs={8}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      className="location"
                    >
                      <LocationOnIcon />
                    </Typography>
                    <span className="locationName"> Amman </span>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={2} xs={4}>
                    <div
                      className={classNames(!fullScreen && "locationCategory")}
                    >
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        className="locationInfo"
                      >
                        Category:
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item md={8} xs={8}>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      className="location"
                    >
                      <DriveEtaIcon />
                    </Typography>
                    <span className="locationName"> Car for sale </span>
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: "10px" }}>
                  <Grid item lg={2} md={2} xs={4}>
                    <IconButton className={classes.iconButton}>
                      <FavoriteIcon />
                    </IconButton>
                  </Grid>
                  <Grid item lg={2} md={2} xs={4}>
                    <IconButton className={classes.iconButton}>
                      <ShareIcon />
                    </IconButton>
                  </Grid>
                  <Grid item lg={2} md={2} xs={4}>
                    <IconButton className={classes.iconButton}>
                      <CallIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingProduct;
