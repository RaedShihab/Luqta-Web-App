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
  // Icon,
  CircularProgress,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import MuiAlert from '@material-ui/lab/Alert';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
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
import Search from './search';
import Menu from "../Category/CategoryMenu";
import CategoryDrawarMenu from "../Category/ResCategoryMenu";
import SearchCategoryDrawarMenu from "../Category/ResSearchCategoryMenu";
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
    },
    link : {
      textDecoration: "none"
    },
    sorryMessage: {textAlign: 'center', fontWeight: 'bold'}
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

  const { t, match, location} : any = props

  // const historyState = history.location.state
  const {params} : any = match

  // current page
  const page :any = ()=> {
    let page
    return page = location.search[location.search.length-2] === '=' ?
      location.search[location.search.length-1]
     :
     location.search[location.search.length-2]+location.search[location.search.length-1]
  }
  const [clickedPage, setClickedPage] = React.useState(1)
  const [lastPage, setLastPage] = React.useState(1)
  // const [redirect, setRedirect] = useState(false);

  const [selectedCategory, setSelectedCategory]: any = useState(params === {} ? null : params.categ);
  
  const [selectedSubCategory, setSelectedSubCategory]: any = useState(params === {} ? null : params.categ);

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
  // const [isResFilter, setIsResFilter] = React.useState(false);

 

  

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
  //get categ by id:
  const getAdsByCategId = (id: any, page: any) => {
    console.log(id)
    setSearchLoading(true)
    setShowPagination(true)
    Axios.get(searchKeyWords === ''?`/ads?category_id=${id}&page=${isNaN(page)? 1 : page}&per_page=${15}`: `/ads?query=${searchKeyWords}&category_id=${id}&page=1&par_page=200`)
    .then(res => {
      console.log(res.data.meta.last_page)
      setLastPage(res.data.meta.last_page)
      setAds(res.data.data)
      setSearchLoading(false)
      setGettingAds(false)
    })
    .catch(err => {
      console.log(err.response)
      setMessage(t('something_went_wrong_please_try_again'))
      setGettingAds(false)
      setSearchLoading(false)
      setOpen(true)
    })
  };

  const [searchKeyWords, setSearchKeyWords] = React.useState('')
  const [searchResults, setSearchResults] = React.useState('')
  const [searchLoading, setSearchLoading] = React.useState(false)
  const [showPagination, setShowPagination] = React.useState(false)
  //get all:
  const getAds = () => {
    setSearchLoading(true)
    console.log(params)
    Axios.get(searchKeyWords !== ''? `/ads?query=${searchKeyWords}&page=1&par_page=200` : `/ads?page=${page()===undefined? 1 : page()}&per_page=${4}`)
    .then((res: { data: any; })=> {
      searchKeyWords !== ''  && setSearchResults(res.data.meta.total)
      setAds(res.data.data)
      setLastPage(res.data.meta.last_page)
      setSearchLoading(false)
      setGettingAds(false)
    })
    .catch(err => {
      console.log(err.response)
      setMessage(t('something_went_wrong_please_try_again'))
      setGettingAds(false)
      setSearchLoading(false)
      setOpen(true)
    })
  }

  function Alert(props : any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = React.useState(false);
  const [pagee, setPage] = React.useState(1);

  const handleClose = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [sortBy, setSortBy] = React.useState("Most Recent");

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const [message, setMessage] = React.useState('')
  const[ads, setAds] = React.useState([])
  const[gettingAds, setGettingAds] = React.useState(false)

  const id :any = localStorage.getItem("categId")
  useEffect(() => {
    // console.log(parseInt(page()))
    setClickedPage(parseInt(page()))
    setGettingAds(true)
    setLabelWidth(inputLabel.current!.offsetWidth);
    //get ads:
    params.categ !== undefined?
    getAdsByCategId(id, parseInt(page()))
      :
    getAds()
  }, []);

  const handlePageNumber = (e: any, value: any) => {
    setPage(value)
    // if(historyState !== undefined) {
    //   history.push({pathname:`/${params.subCateg}/${params.categ}/${value}`, state: {id: historyState.id}})
    //   window.location.reload(false)
    // }
    // if(historyState === undefined) {
    //   setRedirect(true)
    //   setPage(value)
    //   history.push(`/?page=${value}`)
    //   window.location.reload(false)
    // }
  }

  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));

  const classes = useStyles();

  if(gettingAds) {
    return <div className={classes.loading}><CircularProgress size={60}/></div>
  }
  else{
    // if(redirect) {
    //   return <Redirect to={`/?page=${pagee}`}/>
    // }
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
                          {/* {!selectedSubCategory ? <>
                            {!selectedCategory ? (
                              <AppsIcon style={{ marginRight: "5px" }} />
                            ) : <Icon>{selectedCategory.icon}</Icon>}
                              &nbsp;&nbsp;
                            <span style={{ flexGrow: 1 }}>
                              {!selectedCategory ? "Categories" : selectedCategory}
                            </span>
                            </>
                            :  */}
                              <span style={{ flexGrow: 1 }}>
                                {!selectedSubCategory ? t("categories" ): selectedSubCategory}
                              </span>
                           {/* } */}
                          <KeyboardArrowDownOutlinedIcon />
                        </div>
    
                        <Divider
                          className={classes.divider}
                          orientation="vertical"
                        />
    
                        <div className={classes.searchbox + " display-flex"}>
                          {searchKeyWords&& <IconButton
                            type="submit"
                            className={classes.iconButton + " categoryCss"}
                            aria-label="search"
                            onClick={()=>
                              params.categ !== undefined?
                              getAdsByCategId(id, parseInt(page()))
                                :
                              getAds()}
                          >
                           {searchLoading?
                           <CircularProgress/>
                           :
                           <SearchIcon />}
                          </IconButton>}
                          {/* <InputBase
                            className={classes.inputCSS}
                            placeholder="Search for anything.."
                            inputProps={{ "aria-label": "search google maps" }}
                          /> */}
                          <Search  setSearchKeyWords={setSearchKeyWords}/>
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
                          getAdsByCategId={getAdsByCategId}
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
                     {searchResults !== '' && <div className={classNames("cardbutton")}>
                        <Button
                          type="button"
                          fullWidth
                          size="large"
                          variant="contained"
                          color="primary"
                        >
                          {t("search_results")} {searchResults}
                        </Button>
                      </div>}
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
                <span className="Announcement">Announcements: Best of Jordan</span>
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
                {
                  ads.length > 0 ? 
                  <Grid container spacing={2} direction="row">
                  {ads.map((prod: any, index: any) => {
                    return (
                      <Grid key={index} item lg={12} md={12} xs={12}>
                       <ListingProduct ad={prod} />
                      </Grid>
                    );
                  })}
                </Grid>
                :
                <div className={classes.sorryMessage}>
                  <Typography color='primary' variant='h6'>{t("Sorry_we_could_not_find_anything")}</Typography>
                 </div>
                }
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
                    <Button style={{ width: "100%", textTransform:"none" }} size="large" variant="contained" color="primary"> <NotificationsIcon /> {t("save_search")}</Button>
                  </Grid>
                </Grid>
                {/* {
                  ads.length > 0
                  && */}
                  <Grid container spacing={2} direction="row">
                  <Grid item lg={12} md={12} xs={12}>
                    <Link
                    component='a'
                    underline='none'
                    href={params.categ !== undefined? `/${params.subCateg}/${params.categ}?page=${pagee}` : `/?page=${pagee}`}
                    >
                    {showPagination && <Pagination 
                      // defaultPage={isNaN(page)? 1 : parseInt(page())}
                      defaultPage={isNaN(clickedPage)? 1 : clickedPage}
                      count={lastPage}
                      shape="rounded"
                      color="primary"
                      hidePrevButton hideNextButton
                      boundaryCount={10}  
                      onChange={handlePageNumber}
                      />}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                <Typography style={{margin: '0px 10px'}}>
                {message}
                </Typography>
              </Alert>
            </Snackbar>
          </Container>
        </MuiThemeProvider>
      );
  }
};

export default withTranslation('/dashboard/dashboard')(Dashboard);
