import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import classNames from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
  useTheme
} from "@material-ui/core/styles";
import {
  MuiThemeProvider,
  createMuiTheme,
  Toolbar,
  Container,
  Grid,
  Switch,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Icon,
  CircularProgress
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import AppsIcon from "@material-ui/icons/Apps";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import HelpOutlinedIcon from "@material-ui/icons/HelpOutlined";
import StarIcon from "@material-ui/icons/Star";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Checkbox from "@material-ui/core/Checkbox";
import ListingProduct from "../ListingProduct/ListingProduct";
import ListingAds from "../ListingAds/ListingAds";
import Pagination from '@material-ui/lab/Pagination';
import Drawer from '@material-ui/core/Drawer';
import Search from './search';
import Menu from "../Category/CategoryMenu";
import CategoryDrawarMenu from "../Category/ResCategoryMenu";
import SearchCategoryDrawarMenu from "../Category/ResSearchCategoryMenu";
import { category } from '../Category/Categoty';
import "../../../App.css";
import "./Dashboard.css";
import {Axios} from '../../apiServecis/axiosConfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardRoot: {
      padding: "18px"
    },
    radiocss: {},
    card: {
      left: "95px",
      width: "86%",
      display: "block",
      marginTop: "3rem",
      position: "relative",
      overflow: "visible",
      height: "fit-content",
      borderRadius: "0px",
      boxShadow:
        "-1px 2px 1px -1px rgba(0,0,0,0.2), 0px 4px 10px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)"
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    formcontrol: {
      fontSize: 14
    },
    categoryLink: {
      display: "flex",
      width: "25%",
      height: "auto",
      padding: "8px 10px",
      color: "#000",
      fontSize: "1rem",
      textTransform: "none",
      fontWeight: 100,
      background: "#f4f6f7",
      alignItems: "center"
    },
    searchbox: {
      flex: "1 0 30%",
      alignItems: "center",
      background: "#f4f6f7",
      marginRight: "10px"
    },
    inputCSS: {
      flex: 1,
      "&:focus": {
        borderColor: "red",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      }
    },

    iconButton: {
      padding: 10
    },
    divider: {
      height: "auto",
      width: "2px"
    },
    loading: {
      textAlign: 'center'
    }
  })
);

const CustomRadioButton = withStyles((theme: Theme) => ({
  root: {
    padding: "5px"
  },
  checked: {
    color: "#134B8E !important",
  }
}))(Radio);

const theme = createMuiTheme({
  palette: {
    primary: {
        main: "#134B8E",
    },
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        marginLeft: "5px",
        fontSize: "12px",
        // color: "#134B8E",
        fontWeight: 500,
      },
    },
    MuiInputBase: {
      "root": {
        "&$focused": {
          "boxShadow": "0 0 0 0.2rem rgba(0,123,255,.25)"
        }
      },
      // focused:{
      //   borderColor: "red !important",
      //   boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      // }
    },
    
  }
});

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 36,
      height: 22,
      padding: 0,
      display: "flex"
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(12px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main
        }
      }
    },
    thumb: {
      width: 18,
      height: 18,
      boxShadow: "none"
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 20 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white
    },
    checked: {}
  })
)(Switch);

const Dashboard: React.FC = (props) => {

  const {i18n, t, history} : any = props
  const {language} : any = i18n

  const [selectedCategory, setSelectedCategory]: any = useState(null);
  
  const [selectedSubCategory, setSelectedSubCategory]: any = useState(null);

  const [value, setValue] = useState("Offers");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [checkedIndividual, setCheckedIndividual] = React.useState(false);
  const [checkedProfessional, setCheckedProfessional] = React.useState(false);
  const [checkedUrgent, setCheckedUrgent] = React.useState(false);

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true
  });

  const [openResCategorySubMenu, setOpenResCategorySubMenu] = React.useState(false);
  const [openResSearchCategorySubMenu, setOpenSearchResCategorySubMenu] = React.useState(false);
  const [isResFilter, setIsResFilter] = React.useState(false);

 

  

  // const handleClick = () => {
  //   setOpenResCategorySubMenu(!openResCategorySubMenu);
  // };

  

  const handleSwitchChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const openCategoryMenu = (e: any) => {
    setOpenMenu(true);
    let ele: any = document.getElementById("seachCategory"); 
    setMenuAnchor(ele);
  };

  const [sortBy, setSortBy] = React.useState("Most Recent");

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const[ads, setAds] = React.useState([])
  const[gettingAds, setGettingAds] = React.useState(false)
  // const[pageNumber, setPageNumber] = React.useState(1)

  useEffect(() => {
    console.log(props)
    const defaultPage: any = 1
    const page = localStorage.getItem('page')
    setGettingAds(true)
    setLabelWidth(inputLabel.current!.offsetWidth);
    //get ads: 
    Axios.get(`/ads?page=${page}&per_page=${5}`)
    .then((res: { data: any; })=> {
      console.log(res.data.data)
      setAds(res.data.data)
      setGettingAds(false)
      localStorage.setItem('page', defaultPage)
    })
    .catch(err => {
      console.log(err.response)
      setGettingAds(false)
    })
  }, []);

  const handlePageNumber = (e: any, value: any) => {
    localStorage.setItem('page', value)
    window.location.reload(false);
  }

  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));

  const classes = useStyles();

  if(gettingAds) {
    return <div className={classes.loading}><CircularProgress size={60}/></div>
  }
  else{
    return (
      <MuiThemeProvider theme={theme}>
        {!fullScreen ? (
          <>
            <div className={classNames("backColorCss")}>
              <div className={classNames("backColorInnerCss")}></div>
            </div>
            <Container
              fixed
              className="display-flex"
              style={{ alignItems: "center" }}
            >
              <Card className={classes.card}>
                <CardContent className={classes.cardRoot}>
                  <div>
                    <FormControl className={classes.formcontrol}>
                      <RadioGroup
                        row={true}
                        aria-label="Offers"
                        name="offers"
                        value={value}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="Offers"
                          style={{ marginLeft: "0px", color: "#134B8E" }}
                          control={
                            <CustomRadioButton className={classes.radiocss} />
                          }
                          label={t("offers")}
                        />
                        <FormControlLabel
                          value="Requests"
                          style={{ marginLeft: "0px", color: "#134B8E" }}
                          control={<CustomRadioButton />}
                          
                          label={t("requests")}
                        />
                      </RadioGroup>
                    </FormControl>
  
                    <div style={{ display: "flex", cursor: "pointer" }} id="seachCategory">
                      <div
                        className={classes.categoryLink + " categoryCss"}
                        onClick={openCategoryMenu}
                      >
                        {!selectedSubCategory ? <>
                          {!selectedCategory ? (
                            <AppsIcon style={{ marginRight: "5px" }} />
                          ) : <Icon>{selectedCategory.icon}</Icon>} 
                            &nbsp;&nbsp;
                          <span style={{ flexGrow: 1 }}>
                            {!selectedCategory ? "Categories" : selectedCategory.name.en}
                          </span>
                          </>
                          : 
                            <span style={{ flexGrow: 1 }}>
                              {!selectedSubCategory ? "Categories" : selectedSubCategory.name.en}
                            </span>
                         }
  
                        <KeyboardArrowDownOutlinedIcon />
                      </div>
  
                      <Divider
                        className={classes.divider}
                        orientation="vertical"
                      />
  
                      <div className={classes.searchbox + " display-flex"}>
                        <IconButton
                          type="submit"
                          className={classes.iconButton + " categoryCss"}
                          aria-label="search"
                        >
                          <SearchIcon />
                        </IconButton>
                        {/* <InputBase
                          className={classes.inputCSS}
                          placeholder="Search for anything.."
                          inputProps={{ "aria-label": "search google maps" }}
                        /> */}
                        <Search />
                      </div>
  
                      <div className={classes.searchbox + " display-flex"}>
                        <IconButton
                          type="submit"
                          className={classes.iconButton}
                          aria-label="search"
                        >
                          <LocationOnOutlinedIcon />
                        </IconButton>
                        <InputBase
                          style={{ paddingLeft:"10px", paddingRight:"10px", }}
                          className={classes.inputCSS + " categoryCss display-flex-grow-1"}
                          placeholder="Saisissez une ville et un rayon"
                          inputProps={{ "aria-label": "search google maps" }}
                        />
                      </div>
                    </div>
  
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
  
                    <div style={{ display: "flex" }}>
                      <div style={{ flex: 1 }}>
                        {value === "Offers" ? (
                          <>
                            <FormControlLabel
                              style={{ marginLeft: "0px", marginRight: "0px", color: "#555E67" }}
                              control={
                                <AntSwitch
                                  checked={state.checkedC}
                                  style={{ marginRight: "8px" }}
                                  onChange={handleSwitchChange("checkedC")}
                                  value="checkedC"
                                />
                              }
                              label={t("See also the ads available for delivery")}
                            />
  
                            <IconButton
                              className={classes.iconButton}
                              color="primary"
                              aria-label="search"
                            >
                              <HelpOutlinedIcon />
                            </IconButton>
                          </>
                        ) : null}
                      </div>
                      <div>
                        <IconButton
                          className={classes.iconButton}
                          color="primary"
                          aria-label="search"
                        >
                          <NotificationsIcon style={{ color: "#134B8E" }} />
                        </IconButton>
                        <span style={{ color: "#7985A2", fontSize: "12px", fontWeight:500, marginRight: "10px" }}>{t("save_search")}</span>
                      </div>
                    </div>
                  </div>
  
                  <div className={classNames("cardbuttoncss")}>
                    <div className={classNames("cardbutton")}>
                      <Button
                        type="button"
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                      >
                        {t("search_results")} (1,143,764)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Container>
            <Toolbar variant="regular" />
          </>
        ) : null}
        {fullScreen ? 
        <Container fixed className="" style={{ alignItems: "center" }}>
          <Grid container spacing={2} style={{ width: "100%", margin: "auto" }}>
            <Grid item xs={12}>
            <Button onClick={() => { setOpenResCategorySubMenu(true)}} variant="contained" color="primary" style={{ textTransform: "none" }}>Categories</Button>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={() => setOpenSearchResCategorySubMenu(true)} variant="contained" color="primary" style={{ textTransform: "none" }}>Filter</Button>
            <CategoryDrawarMenu openResCategorySubMenu={openResCategorySubMenu} setOpenResCategorySubMenu={setOpenResCategorySubMenu} />
            <SearchCategoryDrawarMenu classes={classes} openResSearchCategorySubMenu={openResSearchCategorySubMenu} setOpenResSearchCategorySubMenu={setOpenSearchResCategorySubMenu} />
            </Grid>
            </Grid>
        </Container>
        : null }
        <Container fixed className="" style={{ alignItems: "center" }}>
          <Grid container spacing={2} style={{ width: "90%", margin: "auto" }}>
            <Grid item xs={12}>
              <span className="Announcement">Announcements: All of France</span>
            </Grid>
            <Grid item lg={4} md={4} xs={12} className="display-flex align-center" style={{ flexBasis: "auto" }}>
              <span className="AnnouncementLabel">Ads:</span> &nbsp;
              <span className="AnnouncementNumber">1,140,253</span>
            </Grid>
            <Grid item lg={4} md={4} xs={12} className="display-flex align-center" style={{ flexBasis: "auto" }}>
              <Checkbox
                size="small"
                style={{ padding: "0px", background: "#fff" }}
                className="mr-10"
                value={checkedIndividual}
                color="primary"
                onChange={(event: any) => {
                  setCheckedIndividual(event.target.checked);
                }}
              />
              <span className="AnnouncementLabel">Individuals</span> &nbsp;
              <span className="AnnouncementNumber">1,043,873</span>
            </Grid>
            <Grid item lg={4} md={4} xs={12} className="display-flex align-center" style={{ flexBasis: "auto" }}>
              <Checkbox
                size="small"
                style={{ padding: "0px", background: "#fff" }}
                className="mr-10"
                value={checkedProfessional}
                color="primary"
                onChange={(event: any) => {
                  setCheckedProfessional(event.target.checked);
                }}
              />
              <span className="AnnouncementLabel">Professionals</span> &nbsp;
              <span className="AnnouncementNumber">96,380</span>
            </Grid>
            <Grid item lg={4} md={4} xs={12} className="display-flex align-center" style={{ flexBasis: "auto" }}>
              <Checkbox
                size="small"
                style={{ padding: "0px", background: "#fff" }}
                className="mr-10"
                value={checkedUrgent}
                color="primary"
                onChange={(event: any) => {
                  setCheckedUrgent(event.target.checked);
                }}
              />
              <span className="AnnouncementLabel">
                <StarIcon style={{ padding: "0px", color: "#134B8E" }} />
              </span>{" "}
              &nbsp;
              <span className="AnnouncementNumber">Urgent</span>
            </Grid>
            <Grid item xs={12} className="display-flex align-center" style={{ flexBasis: "auto" }}>
              <FormControl variant="outlined" size="small">
                <InputLabel
                  ref={inputLabel}
                  id="demo-simple-select-outlined-label"
                >
                  Sort
                </InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e: any) => {
                    setSortBy(e.target.value);
                  }}
                  labelWidth={labelWidth}
                >
                  <MenuItem value={"Most Recent"}>Most Recent</MenuItem>
                  <MenuItem value={20}>Most Recent</MenuItem>
                  <MenuItem value={30}>Most Recent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={1} direction="row">
            <Grid item lg={8} md={8} xs={12}>
              <Grid container spacing={2} direction="row">
                {ads.map((prod: any, index: any) => {
                  return (
                    <Grid key={index} item lg={12} md={12} xs={12}>
                      <ListingProduct ad={prod} />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item lg={4} md={4} xs={12}>
              <Grid container spacing={2} direction="row">
                {["", ""].map((ad: any, index: any) => {
                  return (
                    <Grid key={index} item lg={12} md={12} xs={12}>
                      <ListingAds />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row" className="mt-10" style={{ marginBottom: "50px" }}>
            <Grid item lg={8} md={8} xs={12}>
              <Grid container spacing={2} direction="row">
                <Grid item lg={12} md={12} xs={12}>
                  <Button style={{ width: "100%", textTransform:"none" }} size="large" variant="contained" color="primary"> <NotificationsIcon /> Save Search</Button>
                </Grid>
              </Grid>
              <Grid container spacing={2} direction="row">
                <Grid item lg={12} md={12} xs={12}>
                  <Pagination count={19} color="primary" shape="rounded" boundaryCount={10}  onChange={handlePageNumber}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    );
  }
};

export default withTranslation('/dashboard/dashboard')(Dashboard);
