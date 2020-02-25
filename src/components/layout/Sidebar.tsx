import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

interface ISidebarProps {
  leftDrawerOpen: any;
  setLeftDrawerOpen: any;
}

const Sidebar: React.FC<ISidebarProps> = ({ leftDrawerOpen, setLeftDrawerOpen }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  type DrawerSide = 'top' | 'left' | 'bottom' | 'right';
  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setLeftDrawerOpen(open);
    setState({ ...state, [side]: open });
  };

  const sideList = (side: DrawerSide) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem style={{ justifyContent: "center" }}>
          <img src={"./brand.svg"} style={{ width: "100px" }} alt="luqta" />
        </ListItem>
          <ListItem button>
            <ListItemIcon><AddBoxOutlinedIcon /></ListItemIcon>
            <ListItemText primary={"Post and ad"} />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button>
            <ListItemIcon><ForumIcon /></ListItemIcon>
            <ListItemText primary={"Mes recherches"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><FavoriteBorderIcon /></ListItemIcon>
            <ListItemText primary={"Favoris"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><NotificationsNoneIcon /></ListItemIcon>
            <ListItemText primary={"Notifications"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><CommentIcon /></ListItemIcon>
            <ListItemText primary={"Messages"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><PermIdentityIcon /></ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
      </List>
    </div>
  );

  const fullList = (side: DrawerSide) => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <> 
      <Drawer open={leftDrawerOpen} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
  </>
  );
}

export default Sidebar;
