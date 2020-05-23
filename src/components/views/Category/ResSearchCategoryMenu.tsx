import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {  Button, createMuiTheme, Icon, Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import Search from '../Dashboard/search';

const theme = createMuiTheme({
	overrides: {
		MuiDrawer:{
			paperAnchorRight:{
				width: "100%"
			}
		}
	}
});


interface IMenuProps {
	classes: any;
	openResSearchCategorySubMenu: any;
	setOpenResSearchCategorySubMenu: any;
}

const SearchCategoryDrawarMenu:  React.FC<IMenuProps> = ({ classes, openResSearchCategorySubMenu, setOpenResSearchCategorySubMenu }) => {
	return (
		<MuiThemeProvider theme={theme}>
		<Drawer anchor="right" open={openResSearchCategorySubMenu} onClose={() => setOpenResSearchCategorySubMenu(false)}>
			<div role="presentation">
		<List>
			<ListItem style={{ paddingTop: "2px", paddingBottom: "2px" }}>
				<div style={{ width: "100%" }}>
					<div style={{ float: "left", width: "90%", textAlign: "center" }}>
						<div style={{ float: "left", cursor: "pointer" }} onClick={() => setOpenResSearchCategorySubMenu(false)}>
							{/* <Icon fontSize="small">keyboard_arrow_left</Icon> */}
						</div>
						<ListItemText primary="Filter" />
					</div>
				</div>
			</ListItem>
			<Divider />
			<ListItem>
				<div className={classes.searchbox + " display-flex"}>
					<IconButton
						type="submit"
						className={classes.iconButton + " categoryCss"}
						aria-label="search"
					>
						<SearchIcon />
					</IconButton>
					<Search />
					</div>
			</ListItem>
			<div style={{ bottom: 0, position: "fixed", width: "100%" }}>
			<Divider />
			<ListItem style={{ justifyContent:"center" }}>
				<Button type="button" variant="contained" color="primary" style={{ textTransform: "none" }} onClick={() => setOpenResSearchCategorySubMenu(false)}>
				Validate
				</Button>
			</ListItem>
			</div>
			</List>
      <Divider />
    </div>
  
        </Drawer>
		
		</MuiThemeProvider>
	)
}

export default SearchCategoryDrawarMenu;
