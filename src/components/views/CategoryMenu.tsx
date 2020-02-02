import React, { useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import { MenuContent } from './styles/Elements';
import { Theme, createStyles, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {  Grid, createMuiTheme } from '@material-ui/core';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: '100%',
            width:'100%',
        },
        boxcss: {
            display: "flex"
		},
    }),
);

const theme = createMuiTheme({
	overrides: {
		MuiPopover: {
			paper: {
				minWidth: "60%",
				overflow: "hidden"
			}
		},
		MuiList: {
			root:{
				cursor: "pointer",
			}
		},
		MuiListItem: {
			root: {
				fontSize: "12px",
				'&:hover': {
					background: "#fef0e9",
					color: "#f56b2a",
					borderRadius: "4px",

				},
			},
			gutters: {
				padding: "2px 10px",
			}
		}
	}
});


interface IMenuProps {
	menuAnchor: any;
	setMenuAnchor: any;
	setSelectedCategory: any;
  }

const Menu:  React.FC<IMenuProps> = ({ menuAnchor, setMenuAnchor, setSelectedCategory }) => {

	const classes = useStyles();	

	useEffect(() => {
	}, []);

	const handleClose = () => {
		setMenuAnchor(null);
	};

	const onListItemClick = (value: any) => {
		setSelectedCategory(value);
		setMenuAnchor(null);
	}

	const open = Boolean(menuAnchor);
	const id = open ? 'simple-popover' : undefined;

	return (
		<MuiThemeProvider theme={theme}>
		<Popover
			id={id}
			open={open}
			anchorEl={menuAnchor}
			onClose={handleClose}
			anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'left',
			}}
			transformOrigin={{
			vertical: 'top',
			horizontal: 'left',
			}}
		>
			<MenuContent>
			<Grid container spacing={3}>
              <Grid item xs={4}>
				<List component="nav">
					<div className={classes.boxcss} onClick={() => onListItemClick("Catégories")}>
						<ListOutlinedIcon style={{ marginRight: "5px" }}/> 
						<span style={{ flexGrow: 1 }}>TOUTES CATÉGORIES</span>
					</div>
					<hr />
					<ListItem onClick={() => {onListItemClick("Offres Category")}}>
						<ListItemText primary="Offres Category" />
					</ListItem>		
					<ListItem onClick={() => {onListItemClick("Testing 1")}}>
						<ListItemText primary="Testing 1" />
					</ListItem>
				</List>
                
              </Grid>
              <Grid item xs={4}>
			 	 <List component="nav">
					<div className={classes.boxcss} onClick={() => onListItemClick("Catégories")}>
						<ListOutlinedIcon style={{ marginRight: "5px" }}/> 
						<span style={{ flexGrow: 1 }}>TOUTES CATÉGORIES</span>
					</div>
					<hr />
					<ListItem onClick={() => onListItemClick("Testing Case")}>
						<ListItemText primary="Testing Case" />
					</ListItem>		
					<ListItem onClick={() => onListItemClick("Another Testing")}>
						<ListItemText primary="Another Testing" />
					</ListItem>
				</List>
              </Grid>
			  <Grid item xs={4}>
					<List component="nav">
						<div className={classes.boxcss} onClick={() => onListItemClick("Catégories")}>
							<ListOutlinedIcon style={{ marginRight: "5px" }}/> 
							<span style={{ flexGrow: 1 }}>TOUTES CATÉGORIES</span>
						</div>
						<hr />
						<ListItem onClick={() => onListItemClick("Testing One")}>
							<ListItemText primary="Testing One" />
						</ListItem>		
						<ListItem onClick={() => onListItemClick("Another Test")}>
							<ListItemText primary="Another Test" />
						</ListItem>
					</List>
				</Grid>
            </Grid>
			</MenuContent>
		</Popover>
		</MuiThemeProvider>
	)
}

export default Menu;
