import React, { useEffect, useState } from 'react';
import Popover from '@material-ui/core/Popover';
import { MenuContent } from '../styles/Elements';
import { Theme, createStyles, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import {  Grid, createMuiTheme, Icon, Divider } from '@material-ui/core';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { category } from './Categoty';
import {Axios} from '../../apiServecis/axiosConfig'
import { Link } from '@material-ui/core';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         formControl: {
//             margin: theme.spacing(1),
//             minWidth: '100%',
//             width:'100%',
//         },
//         boxcss: {
// 			display: "flex",
// 			alignItems: "center",
// 			padding: "2px",
// 			fontWeight: 600
// 		},
// 		boxHeader: {
// 			display: "flex",
// 			alignItems: "center",
// 			color: "#134B8E", 
// 			fontWeight: 500,
// 			padding: "0 0 0 10px",
// 		},
// 		categoryList: {
// 			fontSize: "14px",
// 		},
// 		subCategoryList: {
// 			fontSize: "14px",
// 			color: "#141414",
// 			opacity: 0.55,
// 			fontWeight: 500,
// 		},
// 		cateIcon: {
// 			marginRight: "5px",
// 		}
//     }),
// );

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
	// toggleDrawer: any;
	openResCategorySubMenu: any;
	setOpenResCategorySubMenu: any;
}
//   const [isResFilter, setIsResFilter] = React.useState(false);
//   const [resCategoryMenu, setResCategoryMenu] = React.useState(false);

  const side = 'right';
  type DrawerSide = 'top' | 'left' | 'bottom' | 'right';
  const toggleDrawer = (side: DrawerSide, open: boolean, type = "category") => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
	}
    // if (type === "category") {
    //   setIsResFilter(false);
    // } else {
    //   setIsResFilter(true);
    // }
    // setResCategoryMenu(open);
  };
//   const [openResCategorySubMenu, setOpenResCategorySubMenu] = React.useState(true);

const CategoryDrawarMenu:  React.FC<IMenuProps> = ({ openResCategorySubMenu, setOpenResCategorySubMenu }) => {

	const [expanded, setExpanded] = React.useState('');
	const [open, setOpen] = useState(false);
	const [childCateg, setChildCateg] = useState([]);
	const [categories, setCategories] = useState([]);

	const getChildCateg = (id:any) => (event:any, newExpanded:any) => {
			setOpen(true)
			Axios.get(`/categories/${id}/children`)
		    .then(res => {
			console.log(res.data.data)
			setChildCateg(res.data.data);
			setOpen(false)
		})
		.catch(err => console.log(err.response))
		// }
		setExpanded(newExpanded ? id : false);
	  };

useEffect(() => {
	Axios.get(`/categories`)
	.then(res=> {
		setCategories(res.data.data)
	})
	.catch(err => console.log(err.response))
}, []);

	return (
		<MuiThemeProvider theme={theme}>
		<Drawer anchor="right" open={openResCategorySubMenu} onClose={() => setOpenResCategorySubMenu(false)}>
			<div role="presentation">
		<List>
			<ListItem style={{ paddingTop: "2px", paddingBottom: "2px" }}>
				<div style={{ width: "100%" }}>
					<div style={{ float: "left", width: "90%", textAlign: "center" }}>
						<div style={{ float: "left", cursor: "pointer" }} onClick={() => setOpenResCategorySubMenu(false)}>
							<Icon fontSize="small">keyboard_arrow_left</Icon>
						</div>
						<ListItemText primary="Categories" />
					</div>
				</div>
			</ListItem>
			<Divider />
			{
				categories.map((cate: any, index: any) => {
					return (
						<React.Fragment key={index}>
							<ExpansionPanel expanded={expanded === cate.id} onChange={getChildCateg(cate.id)}>
								<ExpansionPanelSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
									>
										<Typography variant='h6'>{cate.name}</Typography>
									</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Collapse in={openResCategorySubMenu} timeout="auto" unmountOnExit>
									{!open? <List component="span" disablePadding>
									{
										childCateg.map((categ: any, index: any) => {
											// let subCategory: any = category.subcategories.data.find((x: any) => x.id === subCate.toString());
											return(
											<ListItem
											key={index} button onClick={() => {
												setOpenResCategorySubMenu(false)
												localStorage.setItem('categId', categ.id)
												}}>
												<Link
													component= "a"
													underline="none"
													href={`/${categ.name}/${cate.name}`}
												>
													<ListItemText primary={categ.name} />
												</Link>
											</ListItem>)
										})
									}
									</List>:
									<CircularProgress/>
									}
									</Collapse>
							   </ExpansionPanelDetails>
							</ExpansionPanel>

							{/* <ListItem button  onClick={() => setOpenResCategorySubMenu(false)}>
								<ListItemIcon>
								<Icon>{cate.icon}</Icon>
								</ListItemIcon>
								<ListItemText primary={cate.name} />
							</ListItem> */}
							{/* <Divider /> */}
							</React.Fragment>
					);
				})
			}
		</List>
      <Divider />
    </div>
  
        </Drawer>
		
		</MuiThemeProvider>
	)
}

export default CategoryDrawarMenu;
