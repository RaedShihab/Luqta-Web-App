import React, { useState, useEffect } from "react";
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
  MenuItem
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
import Menu from "./CategoryMenu";
import ListingProduct from "./ListingProduct/ListingProduct";
import ListingAds from "./ListingAds/ListingAds";
import Pagination from '@material-ui/lab/Pagination';
import "../../App.css";
import "./Dashboard.css";

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
      background: "#f4f6f7"
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
    }
  })
);

const CustomRadioButton = withStyles((theme: Theme) => ({
  root: {
    padding: "5px"
  },
  colorPrimary: {
    color: "#2a368f",
    borderColor: "#2a368f"
  },
  colorSecondary: {
    color: "#2a368f",
    borderColor: "#2a368f"
  },
  checked: {
    color: "#2a368f !important"
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
        marginLeft: "10px"
      }
    }
  }
});

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
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
      width: 12,
      height: 12,
      boxShadow: "none"
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 18 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white
    },
    checked: {}
  })
)(Switch);

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Categories");
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
    setMenuAnchor(e.currentTarget);
  };

  const [sortBy, setSortBy] = React.useState("Most Recent");

  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  const muitheme = useTheme();
  const fullScreen = useMediaQuery(muitheme.breakpoints.down("sm"));

  const classes = useStyles();
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
                        style={{ marginLeft: "0px" }}
                        control={
                          <CustomRadioButton className={classes.radiocss} />
                        }
                        label="Offers"
                      />
                      <FormControlLabel
                        value="Requests"
                        style={{ marginLeft: "0px" }}
                        control={<CustomRadioButton />}
                        label="Requests"
                      />
                    </RadioGroup>
                  </FormControl>

                  <div style={{ display: "flex", cursor: "pointer" }}>
                    <div
                      className={classes.categoryLink}
                      onClick={openCategoryMenu}
                    >
                      {selectedCategory === "Categories" ? (
                        <AppsIcon style={{ marginRight: "5px" }} />
                      ) : null}
                      <span style={{ flexGrow: 1 }}>{selectedCategory}</span>
                      <KeyboardArrowDownOutlinedIcon />
                    </div>

                    <Divider
                      className={classes.divider}
                      orientation="vertical"
                    />

                    <div className={classes.searchbox}>
                      <IconButton
                        type="submit"
                        className={classes.iconButton}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <InputBase
                        className={classes.inputCSS}
                        placeholder="Search for anything.."
                        inputProps={{ "aria-label": "search google maps" }}
                      />
                    </div>

                    <div className={classes.searchbox}>
                      <IconButton
                        type="submit"
                        className={classes.iconButton}
                        aria-label="search"
                      >
                        <LocationOnOutlinedIcon />
                      </IconButton>
                      <InputBase
                        className={classes.inputCSS}
                        placeholder="Saisissez une ville et un rayon"
                        inputProps={{ "aria-label": "search google maps" }}
                      />
                    </div>
                  </div>

                  {openMenu ? (
                    <Menu
                      menuAnchor={menuAnchor}
                      setMenuAnchor={setMenuAnchor}
                      setSelectedCategory={setSelectedCategory}
                    />
                  ) : null}

                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                      {value === "Offers" ? (
                        <>
                          <FormControlLabel
                            style={{ marginLeft: "0px" }}
                            control={
                              <AntSwitch
                                checked={state.checkedC}
                                style={{ marginRight: "8px" }}
                                onChange={handleSwitchChange("checkedC")}
                                value="checkedC"
                              />
                            }
                            label="See also the ads available for delivery"
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
                        <NotificationsIcon style={{ color: "#2a368f" }} />
                      </IconButton>
                      <span>Save Search</span>
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
                      Search (1,143,764 results)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Container>
          <Toolbar variant="regular" />
        </>
      ) : null}
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
              style={{ padding: "0px" }}
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
              style={{ padding: "0px" }}
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
              style={{ padding: "0px" }}
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
        <Grid container spacing={1} direction="row" style={{ marginBottom: "50px" }}>
          <Grid item lg={8} md={8} xs={12}>
            <Grid container spacing={2} direction="row">
              {["", "", "", ""].map((prod: any, index: any) => {
                return (
                  <Grid key={index} item lg={12} md={12} xs={12}>
                    <ListingProduct />
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={2} direction="row">
              <Grid item lg={12} md={12} xs={12}>
                <Button style={{ width: "100%", textTransform:"none" }} size="large" variant="contained" color="primary"> <NotificationsIcon /> Save Search</Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} direction="row">
              <Grid item lg={12} md={12} xs={12}>
                <Pagination count={19} color="primary" shape="rounded" boundaryCount={10}  />
              </Grid>
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
      </Container>
    </MuiThemeProvider>
  );
};

export default Dashboard;
