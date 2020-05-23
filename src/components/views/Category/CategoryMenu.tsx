import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
// import { withTranslation, WithTranslation } from "react-i18next";
import Popover from '@material-ui/core/Popover';
import { MenuContent } from '../styles/Elements';
import { Theme, createStyles, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {  Grid, createMuiTheme, Icon } from '@material-ui/core';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {NavLink} from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';

import { category } from './Categoty';
import {Axios} from '../../apiServecis/axiosConfig'

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
			fontWeight: 600,
			color : "#134B8E",
		},
		boxHeader: {
			display: "flex",
			alignItems: "center",
			color: "#134B8E", 
			fontWeight: 600,
			padding: "0 0 0 10px",
		},
		categoryList: {
			fontSize: "18px",
		},
		subCategoryList: {
			fontSize: "17px",
			color: "#141414",
			opacity: 0.55,
			fontWeight: 500,
		},
		cateIcon: {
			marginRight: "5px",
		},
		link: {
			textDecoration: "none",
			color : "#134B8E",
			fontWeight: "bold"
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


interface Props extends RouteComponentProps{
	menuAnchor: any;
	setMenuAnchor: any;
	selectedCategory?: any;
	setSelectedCategory?: any;
	selectedSubCategory?: any; 
	setSelectedSubCategory?: any;
	// t: any;
  }

const Menu:  React.FC<Props> = ({ menuAnchor, setMenuAnchor, setSelectedSubCategory }) => {

	const [activeCategory, setActiveCategory]: any = useState(null);
	const [activeSubCategory, setActiveSubCategory]: any = useState([]);
	const classes = useStyles();

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		Axios.get(`/categories`)
		.then(res=> {
			console.log(res.data.data)
			setCategories(res.data.data)
		})
		.catch(err => console.log(err.response))
	}, []);

	const handleClose = () => {
		setMenuAnchor(null);
	};

	const onListItemClick = (value: any) => {
		Axios.get(`/categories/${value}/children`)
		.then(res => {
			setActiveSubCategory(res.data.data);
		})
		.catch(err => console.log(err.response))
	}

	const updateSubWithParentCategory = (subCate: any) => {
		// console.log(subCate.name)
		setSelectedSubCategory(subCate.name);
		// getAdsByCategId()
		setMenuAnchor(null);
	}

	// const updateParentCategory = (cate: any) => {
	// 	setSelectedCategory(cate);
	// 	setSelectedSubCategory(null);
	// }

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
							<span style={{ flexGrow: 1 }}>{("All Categories")}</span>
						</ListItem>
				</List>
				<hr />
				<List component="nav" style={{ background: "#f4f6f7" }} >
					{
						categories.map((category: any, index: any) => {
							return (<ListItem className={classes.categoryList} key={index} 
								// selected={selectedCategory && selectedCategory.id === category.id} 
							// onClick={() => { updateParentCategory(category); }}
							onClick={() => {
								onListItemClick(category.id)
								setActiveCategory(category.name)
								}}>
									{/* <Icon>{category.icon}</Icon> */}
									&nbsp; &nbsp;
									<span style={{ flexGrow: 1, fontWeight: 'bold' }}>{category.name}</span>
								</ListItem>	
							);
						})
					}
				</List>
                
              </Grid>
              <Grid item xs={4}>
					<List component="nav">
						<ListItem className={classes.boxcss}>
							<span style={{ flexGrow: 1 }}>{activeCategory? activeCategory: 'Selected category'}</span>
						</ListItem>
					</List>
					<hr />
					<List component="nav" >
						{
						  activeSubCategory.map((subCateg: any, index: any)=> {
							return <ListItem
							       className={classes.categoryList}
								//    className={classes.subCategoryList}
								   key={index}
							   onClick={
								()=>{
									updateSubWithParentCategory(subCateg)
									// localStorage.setItem('categId', subCateg.id)
									// history.push({pathname:`/${activeCategory}/${subCateg.name}`})
									// window.location.reload(false);
								}
								}
							>
								<NavLink
								className={classes.link}
								to={{
									pathname: `/${activeCategory}/${subCateg.name}`,
									state: subCateg.id 
								  }}
								>
								<ListItemText primary={subCateg.name} />
								{/* <span style={{ flexGrow: 1 }}>{subCateg.name}</span> */}
								</NavLink>
								</ListItem>
							})
						}
					</List>
              </Grid>
			  <Grid item xs={4}>
			  		<List component="nav">
						<div className={classes.boxcss} >
							{/* <ListOutlinedIcon style={{ marginRight: "5px" }}/>  */}
							<span style={{ flexGrow: 1 }}>{("Top")}</span>
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

export default withRouter(Menu);
