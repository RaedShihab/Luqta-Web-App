import React, { useEffect, useState, useRef } from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import classNames from "classnames";
import {
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme, Grid, Card, CardContent, CardActionArea, Tabs, Tab, Avatar, useMediaQuery, Container, Icon, ButtonBase, Typography, Badge, Button, Divider, Box,CardMedia, CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import Rating from '@material-ui/lab/Rating';
import Slider from "react-slick";
import Car from "../../../assets/car.png";
import Car1 from "../../../assets/car1.png";
import Car2 from "../../../assets/car2.png";
import Car3 from "../../../assets/car3.png";
import Car4 from "../../../assets/car4.png";
import Car5 from "../../../assets/car2.png";
import Image0 from "../../../assets/Image-0.png";
import Image1 from "../../../assets/Image-1.png";
import Image2 from "../../../assets/Image-2.png";
import Image3 from "../../../assets/Image-3.png";
import "./Ad.css"
import { Axios } from "../../apiServecis/axiosConfig";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > span": {
        margin: theme.spacing(2)
      },
      flexGrow: 1,
      backgroundColor: "#fff"
    },
    cardHover: {
      "&:hover": {
        background: "none",
        boxShadow: "none"
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
      width: "100%",
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
      backgroundColor: "#d9d9d9"
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
    },
    circleIcon: {
      display: "inline-block",
      borderRadius: "50%",
      textAlign: "center",
      verticalAlign: "middle",
      fontSize: "20px !important",
      width: "30px !important",
      height: "30px !important",
      padding: "4px !important",
      backgroundColor: "#fff",
      color: "#000000",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 3px 6px #00000029",
      opacity: 1
    },
    topSlick: {
      display: "flex",
      position: "absolute",
      fontSize: "18px",
      left: "25px",
      zIndex: 1
    },
    downSlick: {
      display: "flex",
      position: "absolute",
      fontSize: "18px",
      left: "25px",
      bottom: "1px",
      zIndex: 1
    },
    topRightIcon: {
      display: "flex",
      position: "absolute",
      top: "4px",
      right: "4px",
      fontSize: "18px"
    },
    button: {
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      border: "0.5px solid #707070",
      borderRadius: "25px",
      opacity: 0.70,
      color: "#000000",
      textTransform: "none",
      "&>span": {
        padding: "5px",
        color: "#000",
        opacity: 1
      }
    },
    detailBtn: {
      "&>span": {
        padding: "10px",
      }
    },
    loading: {
      textAlign: 'center'
    },
  })
);

interface IListingProduct  extends WithTranslation {
  myAds?: boolean;
  match?: object;
  t: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ListingProduct: React.FC<IListingProduct> = ({ myAds = false,  match, t}) => {
  const {params} : any = match;
  const {id} : any = params;

  const classes = useStyles();
  const theme = createMuiTheme({
    overrides: {
      MuiBadge: {
        colorSecondary: {
          backgroundColor: "#1AFF00"
        }
      },
      MuiTab: {
        root: {
          background: "#F7F7F7 0% 0% no-repeat padding-box",
          border: "0.5px solid #A4A4A4",
          opacity: 0.28,
          textTransform: "none",
          '&:hover': {
            backgroundColor: "#134B8E 0% 0% no-repeat padding-box"
          }
        }
      },
    }
  });

  const resScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState<number | null>(3.5);
  const [adsTab, setAdsTab] = React.useState("Details");
  const [settings, setSettings] = React.useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    rtl: false,
    arrows: false
  });
  
  const adSlick = useRef(null);
  
  const handleAdsTabChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setAdsTab(newValue);
  };

  const [adDetails, setAdDetails] = React.useState({});
  const ad : any = adDetails
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('')
  const [gettingDetails, setGettingDetails] = React.useState(true)
  function Alert(props : any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (resScreen) {
      setSettings({ ...settings, slidesToShow: 3 });
    } else {
      setSettings({ ...settings, slidesToShow: 4 });
    }

    Axios.get(`/ads/${id}`)
    .then(res =>{
       console.log(res.data.data)
        setGettingDetails(false)
        setAdDetails(res.data.data)
      })
    .catch(err => {
      console.log(err)
      setGettingDetails(false)
      setMessage(t('something_went_wrong_please_try_again'))
      setOpen(true)
    })
  }, [resScreen])
  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </Typography>
    );
  }

  if(gettingDetails) {
    return <div className={classes.loading}><CircularProgress size={60}/></div>
  }
  else {
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Container fixed className="display-flex" style={{ alignItems: "center" }}>
            <Card className={classes.cardHover} elevation={0}>
              <CardContent className={classNames(resScreen && "rescardContent")}>
                <Grid container spacing={2}>
                  <Grid item lg={1} md={1} xs={3} id="adSlick" >
                    <div style={{ position: "relative" }} ref={adSlick}>
                    <span className={ classes.topSlick }>
                      <Icon className={classes.circleIcon}>
                        keyboard_arrow_up
                      </Icon>
                    </span>
                      <Slider {...settings}>
                        <div>
                          <img src={Car1} style={{ width:"100px", backgroundColor:"#F9F9F9" }} />
                        </div>
                        <div>
                          <img src={Car2} style={{ width:"100px", backgroundColor:"#F9F9F9" }} />
                        </div>
                        <div>
                          <img src={Car3} style={{ width:"100px", backgroundColor:"#F9F9F9" }} />
                        </div>
                        <div>
                          <img src={Car4} style={{ width:"100px", backgroundColor:"#F9F9F9" }} />
                        </div>
                        <div>
                          <img src={Car5} style={{ width:"100px", backgroundColor:"#F9F9F9" }} />
                        </div>
                        <div>
                          <img src={Car3} style={{ width:"100px", backgroundColor:"#F9F9F9" }} />
                        </div>
                      </Slider>
                      <span className={ classes.downSlick }>
                        <Icon className={classes.circleIcon}>
                          keyboard_arrow_down
                        </Icon>
                      </span>
                      </div>
                  </Grid>
                
                  <Grid item lg={5} md={5} xs={9}  style={{ width: "100%" }}>
                    <ButtonBase style={{ width: "100%", position: "relative" }}>
                      <img className={classes.img} style={{ height: resScreen? "260px" : "370px"  }} alt="listProduct" src={Car} />
                      <span className={classes.topRightIcon}>
                        <Icon className={classes.circleIcon} style={{ color: "red" }}>
                          favorite
                        </Icon>
                      </span>
                    </ButtonBase>
                  </Grid>
                  <Grid item lg={5} md={6} xs={12}>
                    <Grid item xs={12}>
                      <div className={classNames(
                          !resScreen && "adcardheader display-flex",
                          resScreen && "resadcardheader"
                        )}
                      >
                          <Typography variant="subtitle1">
                            {ad.title}
                          </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ alignItems: "center" }}
                        className={classNames(
                          !resScreen && "adcardheader", "display-flex"
                        )}
                      >
                          <Typography variant="subtitle1">
                            <Badge color="secondary" variant="dot" overlap="circle"
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }} >
                              <Avatar style={{ background: "#134B8E" }} alt="Remy Sharp">
                                  DC
                              </Avatar>
                            </Badge>
                          </Typography>
                          &nbsp;&nbsp;&nbsp;
                          <span className="adUserName">John Doe</span>
                          &nbsp;
                          <span>
                          <Rating
                            size="small"
                            name="simple-controlled"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                          />
                          
                          </span>
                          <span className="adReview">125 Reviews</span>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<Icon>star</Icon>}
                          >
                            Rate
                          </Button>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                          
                    <div style={{ alignItems: "center" }}
                        className={classNames(!resScreen ? "addetailBtn" : "resAddetailBtn"," display-flex")}
                      >
                        <div style={{ textAlign: "center", marginRight: "20px" }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              className={classes.button + " " + classes.detailBtn}
                              startIcon={<Icon>watch_later</Icon>}
                            >
                              1 Hours
                            </Button>
                            <br />
                            <span className="repliesCss">
                            Replies in
                            </span>
                          </div>
                          <Divider orientation="vertical" flexItem />
                          <div style={{ textAlign: "center", marginLeft: "20px" }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              className={classes.button + " " + classes.detailBtn}
                              startIcon={<Icon>watch_later</Icon>}
                            >
                              100%
                            </Button>
                            <br />
                            <span className="repliesCss">
                            Response Rate
                            </span>
                          </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <div style={{ alignItems: "center" }} className={classNames(!resScreen ? "addetailBtn" : "resAddetailBtn"," display-flex")}>
                        <h3 className={ resScreen ? "resAdRates" : "adRates" }>
                          $60,005.00
                          {/* {ad.price} */}
                          </h3>
                      </div>
                    </Grid>
  
                    <Grid item xs={12}>
                      <div style={{ alignItems: "center" }} className={classNames(!resScreen ? "addetailBtn" : "resAddetailBtn"," display-flex")}>
                      <Button variant="outlined"
                              color="primary"
                              size={resScreen ? "small" : "large"}
                              className={ resScreen ? "resSellerAdBtn" : "sellerAdBtn"}
                            >
                              See the seller's other ads
                            </Button>
                      </div>
                    </Grid>
  
                    <Grid item xs={12}>
                      <div style={{ alignItems: "center" }} className={classNames(!resScreen ? "addetailBtn" : "resAddetailBtn"," display-flex")}>
                        <Button
                          variant="contained"
                          color="primary"
                          size={resScreen ? "small" : "large"}
                          className={resScreen ? "resAdContactbtn" : "adContactbtn"}
                          startIcon={<Icon>call</Icon>}
                        >
                          Call
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size={resScreen ? "small" : "large"}
                          className={resScreen ? "resAdContactbtn" : "adContactbtn"}
                          startIcon={<Icon>chat</Icon>}
                        >
                          Chat
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          size={resScreen ? "small" : "large"}
                          className={resScreen ? "resAdContactbtn" : "adContactbtn"}
                          startIcon={<Icon>label_important</Icon>}
                        >
                          Premium
                        </Button>
                      </div>
                    </Grid>
  
                  </Grid>
                </Grid>
  
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} xs={12} style={{ marginBottom: "10px" }}>
                    <Tabs
                      value={adsTab}
                      indicatorColor="primary"
                      textColor="primary"
                      variant={ resScreen ? "fullWidth" : "standard"}
                      onChange={handleAdsTabChange}
                    >
                      <Tab label="Details"   value="Details"   {...a11yProps(0)}/>
                      <Tab label="Description"  value="Description"  {...a11yProps(1)} />
                      <Tab label="Location" value="Location"   {...a11yProps(2)}/>
                    </Tabs>
                    <TabPanel value={adsTab} index={"Details"}>
                      {/* <Box className="adBoxTab" >
                        <div className="adBoxLeftCol">Price:</div> &nbsp;&nbsp; - &nbsp;&nbsp;
                        <div className="adBoxRightCol">$45,000</div>
                      </Box> */}
                      <Box className="adBoxWhiteTab" >
                        <div className="adBoxLeftCol">Created at:</div> &nbsp;&nbsp; - &nbsp;&nbsp;
                    <div className="adBoxRightCol">{ad.created_at}</div>
                      </Box>
                      <Box className="adBoxTab" >
                        <div className="adBoxLeftCol">Ad Number:</div> &nbsp;&nbsp; - &nbsp;&nbsp;
                    <div className="adBoxRightCol">{ad._id}</div>
                      </Box>
                      <Box className="adBoxWhiteTab" >
                        <div className="adBoxLeftCol">Brand:</div> &nbsp;&nbsp; - &nbsp;&nbsp;
                    <div className="adBoxRightCol">{ad.brand_id}</div>
                      </Box>
                      <Box className="adBoxTab" >
                        <div className="adBoxLeftCol">Model:</div> &nbsp;&nbsp; - &nbsp;&nbsp;
                        <div className="adBoxRightCol">{ad.model_id}</div>
                      </Box>
                      <Box className="adBoxTab" >
                        <div className="adBoxLeftCol">Year:</div> &nbsp;&nbsp; - &nbsp;&nbsp;
                        <div className="adBoxRightCol">1991</div>
                      </Box>
                    </TabPanel>
                    <TabPanel value={adsTab} index={"Description"}>
                      <Box className="adBoxTab" >
                        <div className="adBoxLeftCol">Descrition:</div> &nbsp;&nbsp; - &nbsp;&nbsp;
                    <div 
                    className="adBoxRightCol"
                    >
                      {ad.description}
                      </div>
                      </Box>
                    </TabPanel>
                    <TabPanel value={adsTab} index={"Location"}>
                      <Box className="adBoxTab" >
                        <div className="adBoxLeftCol">City:</div> &nbsp;&nbsp; - &nbsp;&nbsp;
                    <div className="adBoxRightCol">{ad.city_id}</div>
                      </Box>
                      <Box className="adBoxTab" >
                        <div className="adBoxLeftCol">District:</div> &nbsp;&nbsp; - &nbsp;&nbsp;
                    <div className="adBoxRightCol">{ad.district_id}</div>
                      </Box>
                    </TabPanel>
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                    <h2 style={{ color: "#676D80", opacity: 1, margin: 0, marginLeft: "40px", fontWeight: 500 }}>Suggested Items</h2>
                  </Grid>
                  { ["","","",""].map((temp: any, index: any) => {
                    return (
                    <Grid key={index} item lg={3} md={4} xs={12} >
                      <Card className={classes.root}  style={{ borderRadius: "8px" }}>
                        <CardActionArea>
                        <CardMedia
                          style={{ borderRadius: "4px", width: "90%", margin: "16px", marginBottom: 0 }}
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          image={index == 0 ? Image0 :  index == 1 ? Image1 : index == 2 ? Image2 : index === 3 ? Image3 : Image0}
                          title="Contemplative Reptile"
                        />
                        <CardContent style={{ paddingTop: "8px" }}>
                          <div className="display-flex">
                            <div style={{ width: "100%" }}>
                              <Typography variant="body2" color="textSecondary" component="p" style={{ color: "#414041", fontSize: "13px", fontWeight: 500 }}>
                                Lorem Ipsum dummy Text
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="span" style={{ color: "#BBBBBB", fontSize: "10px", fontWeight: 400 }}>
                                Start at 08:00 PM in London
                              </Typography>
                            </div>
                            <div>
                              <Icon style={{ color: "#BBBBBB" }}>more_vert</Icon>
                            </div>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                    </Grid>
                    )
                  })}
                </Grid>
              </CardContent>
            </Card>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                <Typography style={{margin: '0px 10px'}}>
                {message}
                </Typography>
              </Alert>
            </Snackbar>
          </Container>
        </div>
      </MuiThemeProvider>
    );
  }
};

export default withTranslation("/dashboard/dashboard")(ListingProduct);
