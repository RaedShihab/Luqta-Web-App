import React, { useState } from 'react';
import classNames from 'classnames';
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';  
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Switch from '@material-ui/core/Switch';
import HelpOutlinedIcon from '@material-ui/icons/HelpOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';

import Menu  from './CategoryMenu'
import '../../App.css'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    cardRoot: {
      padding: "18px"
    },
    radiocss: {
     
    },
    card: {
      width: "60%",
      display: "block",
      marginTop: "4rem",
      marginBottom: "4rem",
      position: "relative",
      height: "fit-content"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    formcontrol: {
      fontSize: 14,
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
      // marginRight: "10px",
      background: "#f4f6f7",
    },
    searchbox: {
      // padding: '2px 4px',
      flex: "1 0 30%",
      alignItems: 'center',
      // width: 400,
      background: "#f4f6f7",
      marginRight: "10px",
    },
    inputCSS: {
      // marginLeft: theme.spacing(1),
      flex: 1,
      '&:focus': {
        borderColor: 'red',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    
    iconButton: {
      padding: 10,
    },
    divider: {
      height: "auto",
      width: "2px",
    }
  })
);

const CustomRadioButton = withStyles((theme: Theme) => ({
  root: {
    padding: "5px"
  },
  colorPrimary: {
    color: "#f56b2a",
    borderColor: "#f56b2a",
  }, 
  colorSecondary: {
    color: "#f56b2a",
    borderColor: "#f56b2a",
  }, 
  checked: {
    color: "#f56b2a !important",
  }, 
}))(Radio);

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Catégories');
  const [value, setValue] = useState('Offers');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleSwitchChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const openCategoryMenu = (e: any) => {
    setOpenMenu(true);
    setMenuAnchor(e.currentTarget);
  }

  const classes = useStyles();
    return (
      <>
        <div className={classNames("backColorCss")}>
            <div className={classNames("backColorInnerCss")}>
            </div>
        </div>
        <Card className={classes.card}>
          <CardContent className={classes.cardRoot}>
            <div>
              
              <FormControl className={classes.formcontrol}>
                <RadioGroup row={true} aria-label="Offers" name="offers" value={value} onChange={handleChange}>
                  <FormControlLabel value="Offers" control={<CustomRadioButton className={classes.radiocss} />} label="Offers" />
                  <FormControlLabel value="Demandes" control={<CustomRadioButton />} label="Demandes" />
                </RadioGroup>
              </FormControl>

            <div style={{ display: "flex", cursor: "pointer" }}>
                <div className={classes.categoryLink} onClick={openCategoryMenu}>
                    {selectedCategory === "Catégories" ? <ListOutlinedIcon style={{ marginRight: "5px" }}/> : null }
                    <span style={{ flexGrow: 1 }}>{selectedCategory}</span>
                  <KeyboardArrowDownOutlinedIcon />
                </div>
               
                <Divider className={classes.divider} orientation="vertical" />
               
                <div className={classes.searchbox}>
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    className={classes.inputCSS}
                    placeholder="Que recherchez-vous ?"
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />
                </div>
                
                <div className={classes.searchbox}>
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <LocationOnOutlinedIcon />
                  </IconButton>
                  <InputBase
                    className={classes.inputCSS}
                    placeholder="Saisissez une ville et un rayon"
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />
                </div>

            </div>
            
            { openMenu ? <Menu  menuAnchor={menuAnchor} setMenuAnchor={setMenuAnchor}  setSelectedCategory={setSelectedCategory} /> : null}
            
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}> 
              
                {value === "Offers" ?
                    <>
                    <FormControlLabel
                      control={
                        <Switch checked={state.checkedA} onChange={handleSwitchChange('checkedA')} value="checkedA" />
                      }
                      label="Voir également les annonces disponibles en livraison"
                    />
                      <IconButton className={classes.iconButton} color="primary" aria-label="search">
                        <HelpOutlinedIcon />
                      </IconButton>
                    </>
                    :  null}
              </div>
              <div>
              <IconButton className={classes.iconButton} color="primary" aria-label="search">
                <NotificationsOutlinedIcon /> 
              </IconButton>
              <span>Sauvegarder la recherche</span>
              </div>
            </div>
          </div>
         
          <div className={classNames("cardbuttoncss")}>
            <div className={classNames("cardbutton")}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
              >
                Rechercher (26 170 363 résultats)
              </Button>
              </div>
          </div>
          </CardContent>
        </Card>
      </>
    );
}

export default Dashboard;