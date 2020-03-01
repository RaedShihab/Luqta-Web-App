import React from "react";
import classNames from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
// import StarIcon from "@material-ui/icons/Star";
import Mask from "../../../assets/Mask.png";
import FavoriteIcon from "@material-ui/icons/Favorite";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > span": {
        margin: theme.spacing(2)
      },
      flexGrow: 1
    },
    adTitle: {
      marginLeft: "10px",
      color: "rgb(19, 75, 142)",
      fontWeight: "bold"
    },
    adSubTitle: {
      marginLeft: "10px",
      opacity: 0.6,
      fontWeight: 400
    },
    adCaptionTitle: {
      marginLeft: "10px",
      opacity: 0.38
    },
    adUrgent: {
      opacity: 1,
      fontWeight: "bold",
      marginLeft: "10px",
      color: "#EE7444"
    },
    iconButton: {
      color: "#EF4B39",
      marginRight: "10px"
    }
  })
);
const ListingAds: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div className={classes.root}>
      <Card>
        <CardContent className={classNames(fullScreen && "rescardContent")}>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} xs={12}>
              <ButtonBase style={{ width: "100%" }}>
                <img alt="listProduct" src={Mask} />
              </ButtonBase>
            </Grid>
            <div className="display-flex" style={{ width: "100%" }}>
              <Typography
                gutterBottom={!fullScreen}
                variant="subtitle1"
                className={classNames(classes.adTitle, " display-flex-grow-1")}
              >
                Very nice house in Loir et Cher
              </Typography>
              <FavoriteIcon className={classes.iconButton} />
            </div>
            <div style={{ width: "100%" }}>
              <Typography
                gutterBottom={!fullScreen}
                variant="subtitle2"
                className={classNames(
                  classes.adSubTitle,
                  " display-flex-grow-1"
                )}
              >
                Real estate sales - Bourges 18000
              </Typography>
              <Typography
                gutterBottom={!fullScreen}
                variant="caption"
                className={classNames(
                  classes.adCaptionTitle,
                  " display-flex-grow-1"
                )}
              >
                27 Feb - 13:37 - 5 Photos
              </Typography>
            </div>
            {/* <div>
              <Typography
                gutterBottom={!fullScreen}
                variant="caption"
                className={classNames(
                  classes.adUrgent,
                  " display-flex align-center"
                )}
              >
                <StarIcon /> &nbsp; &nbsp;Urgent
              </Typography>
            </div> */}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListingAds;
