import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
  useTheme,
} from "@material-ui/core/styles";
import {
  MuiThemeProvider,
  createMuiTheme,
  Container,
  IconButton,
  Grid,
  InputBase,
  Button,
  InputAdornment,
  CircularProgress,
  Typography,
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import Wallet from '../../../assets/wallet.png';

import ListingProduct from "../ListingProduct/ListingProduct";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import CreateIcon from '@material-ui/icons/Create';
import Menu from "../Category/CategoryMenu";
import CategoryDrawarMenu from "../Category/ResCategoryMenu";
import Search from './searchAds';
import "./MyAds.css";
import {Axios} from '../../apiServecis/axiosConfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      borderRadius: "3px"
    },
    cardContent: {
      "&:last-child": {
        paddingBottom: "16px"
      }
    },
    walletMoney: {
      color: "#444444",
      fontFamily: "Roboto",
      fontWeight: 400,
      fontSize: "16px"
    },
    tagLine: {
      fontSize: "10px"
    },
    promoLine: {
      color:"#01B8F8",
      fontSize:"12px",
      float: "right",
      marginRight:"20px",
      marginTop: "5px"
    },
    inputCSS: {
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      border: "1px solid #D9D9D9",
      borderRadius: "4px",
      width: "90%",
      float: "right",
      marginRight: "20px",
      padding: "2px 10px 2px 10px"
    },
    btnCSS: {
      textTransform: "none",
      width: "100%"
    },
    iconButton: {
      padding: 4
    },
    commandBtn: {
      backgroundColor: "rgb(139,157,195, 0.15)",
      borderRadius: "4px",
      width: "100%",
      marginRight: "20px",
      color: "#134B8E",
      textTransform: "none",
      fontSize: "12px",
      fontWeight: 400,
      "&:last-child": {
        marginRight: 0,
        color: "#FF0000"
      }
    },
    resCommandBtn: {
      width: "50%",
      marginBottom: "5px",
      marginRight: "0px",
    },
    loading: {
      textAlign: 'center'
    }
  })
);


const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(2),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

const MyAds: React.FC = (props) => {
  const {t} :any = props

  const muitheme = useTheme();
 
 
  const theme = createMuiTheme({
    palette: {
      primary: {
          main: "#134B8E",
      },
    },
    overrides: {
      MuiTab: {
        root: {
          textTransform: "none",
          minWidth: "130px !important",
          '&:hover': {
            backgroundColor: "#DFE4E8"
          }
        }
      },
      MuiButtonBase: {
        root: {
          fontSize: "12px"
        }
      },
      MuiFormControlLabel: {
        label: {
          fontSize: "11px",
          fontWeight: 400,
          color: "#2A2A2A"
        }
      }
    }
  });
 
 
 
  const responsive = useMediaQuery(muitheme.breakpoints.down("sm"));

  const [sortBy, setSortBy] = React.useState('10');
  const handleSortByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [adsTab, setAdsTab] = React.useState("Active");
  const handleAdsTabChange = (event: React.ChangeEvent<{}>, newValue: any) => {
    setAdsTab(newValue);
  };

  const [selectAll, setSelectAll] = React.useState(false);
  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      setState({ 0: true, 1: true, 2: true });
    } else {
      setState({ 0: false, 1: false, 2: false });
    }
  };

  const [state, setState]: any = React.useState({
    0: false,
    1: false,
  });

  const handleAdsCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.value]: event.target.checked });
  };

  const[ads, setAds] = React.useState([])
  const[gettingAds, setGettingAds] = React.useState(false)
  const [message, setMessage] = React.useState('')

  useEffect(() => {
    const defaultPage: any = 1
    const page = localStorage.getItem('page')

    if(state) {
      let isAllSelected = true;
      Object.keys(state).map((st : any) => {
        if(!state[st]) {
          isAllSelected = false;
        }
      });
      if (isAllSelected) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
    }
    setGettingAds(true)
    Axios.get(`/ads?page=${page}&per_page=${5}`)
    .then((res: { data: any; })=> {
      console.log(res.data.data)
      setAds(res.data.data)
      setGettingAds(false)
      localStorage.setItem('page', defaultPage)
    })
    .catch(err => {
      console.log(err.response)
      setMessage(t('something_went_wrong_please_try_again'))
      setOpen(true)
      setGettingAds(false)
    })
  }, [state])


  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedCategory, setSelectedCategory]: any = useState(null);
  const [openResCategorySubMenu, setOpenResCategorySubMenu] = React.useState(false);
  const [selectedSubCategory, setSelectedSubCategory]: any = useState(null);

  const openCategoryMenu = () => {
    setOpenMenu(true);
    let ele: any = document.getElementById("seachCategory"); 
    setMenuAnchor(ele);
  };

  function Alert(props : any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  if(gettingAds) {
    return <div className={classes.loading}><CircularProgress size={60}/></div>
  }
  else {
    return (
      <MuiThemeProvider theme={theme}>
       
          <Grid container spacing={2} style={{ width: "100%", margin: "auto",  background: "#FFF" }}>
            <Grid item xs={12}>
              <Container fixed className="" style={{ alignItems: "center", }}>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="on"
                  onChange={handleChange}
                >
                  <Tab label={t("my_ads")} />
                  <Tab label={t("my_comunity")} />
                  <Tab label={t("profile")} />
                  <Tab label={t("notifications")} />
                  <Tab label={t("chat")} />
                </Tabs>
              </Container> 
            </Grid>
          </Grid>
  
          <Grid container spacing={3} style={{ width: "100%", margin: "auto",  background: "#F6F6F6" }}>
            <Grid item xs={12}>
              <Container fixed className="" style={{ alignItems: "center", }}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Grid container className="align-flex-start">
                      <Grid item lg={6} md={4} xs={12}>
                          <div style={{ display: "inline-block"}}><img src={Wallet} width="50px" /></div>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <div style={{ display: "inline-block" }} className={classes.walletMoney}>
                            ₹ 498.02
                            <div style={{ display: "block"}} className={classes.tagLine}>
                            {t("your_wallet_balance")}
                          </div>
                        </div>
                      </Grid>
                      <Grid item lg={4} md={4} xs={12}>
                            <InputBase
                              className={classes.inputCSS}
                              placeholder={t("enter_wallet_ammount")}
                              inputProps={{ "aria-label": "search google maps" }}
                            />
                            <div className={classes.promoLine}>
                            {t("have_promocode")}
                          </div>
                      </Grid>
                      <Grid item lg={2} md={4} xs={12}>
                        <Button className={classes.btnCSS} color="primary" variant="contained">
                         {t("search_in_myads")}
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Container> 
            </Grid>
          </Grid>
  
          <Grid container spacing={3} style={{ width: "100%", margin: "auto",  background: "#D4D4D4" }}>
            <Grid item xs={12}>
              <Container fixed className="" style={{ alignItems: "center", }}>
                    <Grid container className="align-center" style={{ padding: "16px" }}>
                      <Grid item lg={6} md={4} xs={12}>
                          {/* <InputBase
                              style={{ marginBottom: "5px" }}
                              className={classes.inputCSS}
                              placeholder="Search inside my ads"
                              inputProps={{ "aria-label": "search google maps" }}
                          /> */}
                          <Search />
                      </Grid>
                      <Grid item lg={4} md={4} xs={12} id="seachCategory">
                          <InputBase
                              style={{ marginBottom: "5px" }}
                              className={classes.inputCSS}
                              onClick={() => { !responsive ? openCategoryMenu() : setOpenResCategorySubMenu(true) }}
                              placeholder="Categories"
                              value={!selectedCategory ? "Categories" : selectedCategory.name.en}
                              inputProps={{ "aria-label": "search google maps" }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton aria-label=""  edge="end">
                                    <KeyboardArrowDownOutlinedIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                          />
                          <CategoryDrawarMenu openResCategorySubMenu={openResCategorySubMenu} setOpenResCategorySubMenu={setOpenResCategorySubMenu} />
                      </Grid>
                      <Grid item lg={2} md={4} xs={12}>
                        <Button className={classes.btnCSS} style={{ marginBottom: "5px" }} color="primary" variant="contained">
                          {t("search")}
                        </Button>
                      </Grid>
                    </Grid>
              </Container> 
            </Grid>
          </Grid>
        
  
              {openMenu ? (
                      <Menu
                        menuAnchor={menuAnchor}
                        setMenuAnchor={setMenuAnchor}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedSubCategory={selectedSubCategory}
                        setSelectedSubCategory={setSelectedSubCategory}
                      />
                    ) : null}
        
          <Grid container spacing={2} style={{ width: "100%", margin: "auto",  background: "#F6F6F6" }}>
            <Grid item lg={12} md={12} xs={12}>
              <Container fixed className={!responsive? "display-flex" : ""} style={{ alignItems: "center" }}>
                <Grid item lg={10} md={10} xs={12} style={{ marginBottom: "10px" }}>
                  <Tabs
                    value={adsTab}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="on"
                    onChange={handleAdsTabChange}
                  >
                    <Tab label={t("active")}value="Active"   />
                    <Tab label={t("premium")}  value="Premium"  />
                    <Tab label={t("inactive")} value="Inactive"  />
                    <Tab label={t("deleted")}  value="Deleted"  />
                  </Tabs>
                </Grid>
                <Grid item lg={2} md={2} xs={12} style={{ marginBottom: "10px" }} >
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-customized-select-label">{t("sort_by")}</InputLabel>
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={sortBy}
                      placeholder=""
                      onChange={handleSortByChange}
                      input={<BootstrapInput />}
                      IconComponent={KeyboardArrowDownOutlinedIcon}
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={10}>Date</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Container> 
            </Grid>
            <Container fixed  style={{ alignItems: "center", marginBottom: "20px" }}>
            <Grid item lg={12} md={12} xs={12} className={!responsive? "display-flex" : ""}>
                <Grid item lg={6} md={2} xs={12}>
                   <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox checked={selectAll} color="primary" onChange={handleSelectAllChange} value="checkedA" />
                        }
                        label={t("selectAll")}
                      />
                   </FormGroup>
                </Grid>
                <Grid item lg={6} md={10} xs={12} className={!responsive? "display-flex" : ""} style={{ justifyContent: "flex-end", textAlign: "center" }}>
                  <Button variant="contained" className={classNames(classes.commandBtn, responsive ? classes.resCommandBtn : '')}><CreateIcon /> &nbsp;&nbsp; {t("edit")}</Button>
                  <Button variant="contained" className={classNames(classes.commandBtn, responsive ? classes.resCommandBtn : '')}><FlashOnIcon /> &nbsp;&nbsp; {t("premium")}</Button>
                  <Button variant="contained" className={classNames(classes.commandBtn, responsive ? classes.resCommandBtn : '')}><DeleteRoundedIcon /> &nbsp;&nbsp;{t("remove")}</Button>
                </Grid>
            </Grid>
            </Container> 
            
            <Grid item xs={12}>
              <Container fixed className="" style={{ alignItems: "center", marginBottom: "20px" }}>
                <Grid container spacing={2} direction="row">
                {adsTab === "Active" ?             
                  ads.map((prod: any, index: number) => {
                      return (
                        <Grid key={index} item lg={12} md={12} xs={12}>
                          <div className="display-flex">
                          <FormGroup row>
                            <FormControlLabel
                                control={
                                  <Checkbox checked={state[index]} color="primary" onChange={handleAdsCheckBoxChange} value={index} />
                                }
                                label=""
                              />
                          </FormGroup>
                          <ListingProduct myAds={true} ad={prod}/>
                          </div>
                        </Grid>
                      );
                    })
                  : null}
                  {/* {ads===[] && <Card style={{textAlign: 'center', margin: 'auto'}}><Typography variant="h6">Sorry no resilts to show</Typography></Card>} */}
                </Grid>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="error">
                    <Typography style={{margin: '0px 10px'}}>
                    {message}
                    </Typography>
                  </Alert>
                </Snackbar>
                </Container> 
            </Grid>
          </Grid>
        </MuiThemeProvider>
    );
  }
};

export default withTranslation('/myAds/myads')(MyAds);
