import React, { useState } from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import classNames from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import Link from '@material-ui/core/Link';
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
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
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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

interface IListingProduct extends WithTranslation {
  myAds?: boolean;
  ad?: any;
  t: any;
}
const ListingProduct: React.FC<IListingProduct> = ({ myAds = false, ad, t}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [dispImage, setDispImage]: any = useState(false);
  const [showPhone, setShowPhone] = React.useState(false);

  function Alert(props : any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handlePhoneShow = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowPhone(false);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.cardHover} onMouseOver={() => { setDispImage(true);  }} onMouseLeave={() => { setDispImage(false);  }}>
        <CardContent className={classNames(fullScreen && "rescardContent")}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={3} xs={4}>
              <ButtonBase style={{ width: "auto", position: "relative" }} >
                <Link
                  underline="none"
                  component="a"
                  href={`/ad-detail/${ad.id}`}
                  >
                <img className={classes.img} alt="listProduct" src={ad.featured === null?Product: ad.featured.image} />
                </Link>
                <span className={dispImage ? "topLeft" : "display-none"}>
                  <Icon className={"circle-icon "}>
                    near_me
                  </Icon>
                  </span>
              </ButtonBase>
            </Grid>
            <Grid item lg={9} md={9} xs={8} sm container>
              <Grid item xs={12}>
               <Link
                  underline="none"
                  component="a"
                  href={`/ad-detail/${ad.id}`}
               >
               <Grid item xs={12}>
                  <div
                    className={classNames(
                      !fullScreen && "cardheader display-flex",
                      fullScreen && "resCardheader"
                    )}
                  >
                    <div>
                      <Typography
                        style={{ fontWeight: 500 }}
                        variant="subtitle1"
                      >
                        {ad.title}
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
                    &nbsp;&nbsp; {ad.created_at}
                  </span>
                </div>
                <br />
                <Grid container>
                  <Grid item md={2} xs={4}>
                    <div
                      className={classNames(!fullScreen && "locationCategory")}
                    >
                      <Typography
                        variant="caption"
                        color="textSecondary"
                        // className="locationInfo"
                      >
                        {t("city")}:
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
                    <span className="locationName"> {ad.city.name.ar} </span> |
                    <span className="locationName"> {ad.district_id} </span>
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
                        // className="locationInfo"
                      >
                        {t("category")}:
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
                    {/* <span className="locationName"> {ad.category.name.ar} </span>| */}
                    {/* <span className="locationName"> {ad.model} </span>|
                    <span className="locationName"> {ad.brand} </span> */}
                  </Grid>
                </Grid>
               </Link>
                {!myAds ? 
                  <Grid container style={{ marginTop: "10px" }} direction="row">
                    <Grid item lg={1} md={2} xs={3}>
                      <IconButton className={classes.iconButton}>
                        <FavoriteIcon />
                      </IconButton>
                    </Grid>
                    {!fullScreen && <Box m={2} />}
                    <Grid item lg={1} md={2} xs={3}>
                      <IconButton className={classes.iconButton}>
                        <ShareIcon />
                      </IconButton>
                    </Grid>
                    {!fullScreen && <Box m={2} />}
                    <Grid item lg={1} md={2} xs={3}>
                      <IconButton onClick={()=>{setShowPhone(!showPhone)}} className={classes.iconButton}>
                        <CallIcon />
                      </IconButton>
                    </Grid>
                    {!fullScreen && <Box m={2} />}
                    <Grid item container alignContent="flex-end" justify="flex-end" direction="row" lg={7} md={2} xs={3}>
                      <Avatar style={{ background: "#134B8E" }} alt="Remy Sharp">DC</Avatar>
                    </Grid>
                  </Grid>
                  : null}
              </Grid>
            </Grid>
          </Grid>
              <Snackbar open={showPhone} onClose={handlePhoneShow}>
                <Alert onClose={handlePhoneShow} severity="info">
                  <Typography style={{margin: '0px 10px'}}>
                  {t("phone")}: {ad.user.phone_number}
                  </Typography>
                </Alert>
            </Snackbar>
        </CardContent>
      </Card>
    </div>
  );
};

export default withTranslation("/dashboard/dashboard")(ListingProduct);
