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

import { category } from './Categoty';


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
				category.categories.data.map((cate: any, index: any) => {
					return (
						<React.Fragment key={index}>
 
							<ListItem button  onClick={() => setOpenResCategorySubMenu(false)}>
								<ListItemIcon>
								<Icon>{cate.icon}</Icon>
								</ListItemIcon>
								<ListItemText primary={cate.name.en} />
							</ListItem>
							<Divider />
							<Collapse in={openResCategorySubMenu} timeout="auto" unmountOnExit>
								<List component="span" disablePadding>
								{
									cate.subcategories.map((subCate: any, index: any) => {
										let subCategory: any = category.subcategories.data.find((x: any) => x.id === subCate.toString());
										return(
										<ListItem key={index} button onClick={() => setOpenResCategorySubMenu(false)}>
										<ListItemText primary={subCategory.name.en} />
										</ListItem>)
									})
								}
								</List>
							</Collapse>
							<Divider />
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
