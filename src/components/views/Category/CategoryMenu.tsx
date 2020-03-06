import React, { useEffect, useState } from 'react';
import Popover from '@material-ui/core/Popover';
import { MenuContent } from '../styles/Elements';
import { Theme, createStyles, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {  Grid, createMuiTheme, Icon } from '@material-ui/core';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import DriveEtaIcon from '@material-ui/icons/DriveEta';
// import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
// import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { category } from './Categoty';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: '100%',
            width:'100%',
        },
        boxcss: {
			display: "flex",
			alignItems: "center",
			padding: "2px",
			fontWeight: 600
		},
		boxHeader: {
			display: "flex",
			alignItems: "center",
			color: "#134B8E", 
			fontWeight: 500,
			padding: "0 0 0 10px",
		},
		categoryList: {
			fontSize: "14px",
		},
		subCategoryList: {
			fontSize: "14px",
			color: "#141414",
			opacity: 0.55,
			fontWeight: 500,
		},
		cateIcon: {
			marginRight: "5px",
		}
    }),
);

const theme = createMuiTheme({
	overrides: {
		MuiPopover: {
			paper: {
				minWidth: "62%",
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
				fontSize: "14px",
				'&:hover': {
					background: "#FFF",
					color: "#134B8E",
					borderRadius: "4px",
				},
				"&$selected": {
					background: "#fff"
				}
			},
			gutters: {
				padding: "10px 10px",
			}
		}
	}
});


interface IMenuProps {
	menuAnchor: any;
	setMenuAnchor: any;
	selectedCategory: any;
	setSelectedCategory: any;
	selectedSubCategory: any; 
	setSelectedSubCategory: any;
  }

const Menu:  React.FC<IMenuProps> = ({ menuAnchor, setMenuAnchor, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory  }) => {

	const [activeCategory, setActiveCategory]: any = useState(null);
	const [activeSubCategory, setActiveSubCategory]: any = useState(null);
	const classes = useStyles();	

	useEffect(() => {
	}, []);

	const handleClose = () => {
		setMenuAnchor(null);
	};

	const onListItemClick = (value: any) => {
		setActiveCategory(value.name.en);
		setActiveSubCategory(value.subcategories);
		// setMenuAnchor(null);
	}

	const updateSubWithParentCategory = (subCate: any) => {
		const subCategory: any = category.subcategories.data.find((cat) => cat.id === subCate.toString());
		const parentCat = category.categories.data.find((cat) => cat.id === subCategory.parent_id.toString());
		setSelectedCategory(parentCat);
		setSelectedSubCategory(subCategory);
		setMenuAnchor(null);
	}

	const updateParentCategory = (cate: any) => {
		setSelectedCategory(cate);
		setSelectedSubCategory(null);
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
			horizontal: 'center',
			}}
			transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
			}}
			style={{ marginTop: "10px" }}
		>
			<MenuContent>
			<Grid container spacing={2}>
              <Grid item xs={4}>
				<List component="nav">
						<ListItem className={classes.boxHeader} onClick={() => onListItemClick("Catégories")}>
							<ListOutlinedIcon style={{ marginRight: "5px" }}/> 
							<span style={{ flexGrow: 1 }}>ALL CATEGORIES</span>
						</ListItem>
				</List>
				<hr />
				<List component="nav" style={{ background: "#f4f6f7" }} >
					{
						category.categories.data.map((category: any, index: any) => {
							return (<ListItem className={classes.categoryList} key={index} selected={selectedCategory && selectedCategory.id === category.id} onClick={() => { updateParentCategory(category); }} onMouseOver={() => {onListItemClick(category)}}>
									<Icon>{category.icon}</Icon>
									&nbsp; &nbsp;
									<span style={{ flexGrow: 1 }}>{category.name.en}</span>
								</ListItem>	
							);
						})
					}
				</List>
                
              </Grid>
              <Grid item xs={4}>
					<List component="nav">
						<ListItem className={classes.boxcss}>
							<span style={{ flexGrow: 1 }}>{activeCategory}</span>
						</ListItem>
					</List>
					<hr />
					<List component="nav" >
						{
							activeSubCategory && activeSubCategory.length ?
								activeSubCategory.map((subCate: any, index: any) => {
									let subCategory: any = category.subcategories.data.find(x => x.id === subCate.toString());
									return (<ListItem className={classes.subCategoryList} key={index} onClick={() => { updateSubWithParentCategory(subCate); }}>
									<span style={{ flexGrow: 1 }}>{subCategory.name.en}</span>
								</ListItem>)	
								})
							: null							
						}
					</List>
              </Grid>
			  <Grid item xs={4}>
			  		<List component="nav">
						<div className={classes.boxcss} >
							{/* <ListOutlinedIcon style={{ marginRight: "5px" }}/>  */}
							<span style={{ flexGrow: 1 }}>Top Brands</span>
						</div>						
					</List>
					<hr/>
					<List component="nav" >
							{
								category.brands.data.map((category: any, index: any) => {
									return (<ListItem className={classes.subCategoryList} key={index}>
											<span style={{ flexGrow: 1 }}>{category.name.en}</span>
										</ListItem>	
									);
								})
							}
						</List>
				</Grid>
		    </Grid>
			</MenuContent>
		</Popover>
		</MuiThemeProvider>
	)
}

export default Menu;
