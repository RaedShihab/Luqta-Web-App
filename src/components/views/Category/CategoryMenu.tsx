import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withTranslation, WithTranslation } from "react-i18next";
import Popover from '@material-ui/core/Popover';
import { MenuContent } from '../styles/Elements';
import { Theme, createStyles, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {  Grid, createMuiTheme, Icon } from '@material-ui/core';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from "@material-ui/core/Divider";
// import ListItemText from '@material-ui/core/ListItemText';
// import DriveEtaIcon from '@material-ui/icons/DriveEta';
// import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
// import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
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


interface Props extends RouteComponentProps{ 
	menuAnchor: any;
	setMenuAnchor: any;
	selectedCategory: any;
	setSelectedCategory: any;
	selectedSubCategory: any; 
	setSelectedSubCategory: any;
	// t: any;
	getAdsByCategId?: any;
	history: any 
  }

const Menu:  React.FC<Props> = ({ menuAnchor, setMenuAnchor, selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory, getAdsByCategId, history  }) => {

	const [activeCategory, setActiveCategory]: any = useState(null);
	const [activeSubCategory, setActiveSubCategory]: any = useState([]);
	const classes = useStyles();

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		Axios.get(`/categories`)
		.then(res=> {
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
		setSelectedSubCategory(subCate);
		// getAdsByCategId()
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
							<span style={{ flexGrow: 1 }}>{("ALL_CATEGORIES")}</span>
						</ListItem>
				</List>
				<hr />
				<List component="nav" style={{ background: "#f4f6f7" }} >
					{
						categories.map((category: any, index: any) => {
							return (<ListItem className={classes.categoryList} key={index} selected={selectedCategory && selectedCategory.id === category.id} 
							onClick={() => { updateParentCategory(category); }} 
							onMouseOver={() => {
								onListItemClick(category.id)
								setActiveCategory(category.name.ar)
								}}>
									<Icon>{category.icon}</Icon>
									&nbsp; &nbsp;
									<span style={{ flexGrow: 1 }}>{category.name.ar}</span>
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
						  activeSubCategory.map((subCateg: any, index: any)=> {
							return <ListItem className={classes.subCategoryList} key={index} 
							   onClick={
								()=>{
									updateSubWithParentCategory(subCateg)
									history.push({pathname:`/${activeCategory}/${subCateg.name.ar}`, state: {id: subCateg.id}})
									window.location.reload(false);
								}
								}>
								{/* <Link to={{
									pathname: `/${activeCategory}/${subCateg.name.ar}`,
									state: {id: subCateg.id}
								}}> */}
								<span style={{ flexGrow: 1 }}>{subCateg.name.ar}</span>
								{/* </Link> */}
								</ListItem>
							})
						}
					</List>
              </Grid>
			  <Grid item xs={4}>
			  		<List component="nav">
						<div className={classes.boxcss} >
							{/* <ListOutlinedIcon style={{ marginRight: "5px" }}/>  */}
							<span style={{ flexGrow: 1 }}>{("top_brands")}</span>
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
