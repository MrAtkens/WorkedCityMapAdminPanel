import React, { useContext } from 'react'
import { observer } from "mobx-react";
import { ToastContainer } from 'react-toastify'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, List,
IconButton, ListItem, ListItemIcon, ListItemText, Avatar } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom'

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

import { SystemStoreContext } from 'store'
import SwitchRoutes from './switchRouter'
import { ModeratorsList } from './ViewLists/moderatorList'
import { AdminList } from './ViewLists/adminView'
import { Role } from 'tools'
const drawerWidth = 300;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'rgb(131,58,180), linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,119,29,1) 50%, rgba(252,176,69,1) 100%)',
  },
  bigAvatar: {
    width: 50,
    height: 50,
    margin: "0px 20px"
  },
  appBarShift: { 
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundImage: `url(${"assets/img/sidebar-4.jpg"})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  linkH5: {
    color: 'white',
    textDecoration: "none",
    fontSize: "20pt"
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  linkList:{
    fontSize: "36pt",
    color: "#DADBDB",
    textDecoration: "none"
  },
  listIcon:{
    color: '#DADBDB',
  },
}));


const AdministrationView = observer(() =>{
  const classes = useStyles();
  const theme = useTheme();
  const systemStore = useContext(SystemStoreContext);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
    <CssBaseline />
    <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
          <Toolbar>
            <IconButton    
              aria-label="Открыть меню"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
              <Typography variant="h5" noWrap>
                <Link className={classes.linkH5} to="/main">
                  Worked City Maps
                </Link>
              </Typography>
          </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Link to="/main"><Avatar alt="Worked city maps" src={'assets/img/logo.png'} className={classes.bigAvatar} /></Link>
          <Link className={classes.linkList} to="/main"><Typography variant="h6" noWrap>Worked City Maps</Typography></Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon className={classes.listIcon} /> : <ChevronRightIcon className={classes.listIcon} />}
          </IconButton>
        </div>
        <List>
          <Divider />
          <Link to="/user">
            <ListItem className={classes.linkList} button>
                <ListItemIcon> 
                <Avatar className={classes.green}>
                  <PersonIcon />
                </Avatar>
                </ListItemIcon>
                <ListItemText primary={systemStore.showUserFullName} />
            </ListItem>
          </Link>
          <Divider />
          {systemStore.userRole === Role.Admin ? (<AdminList/>) : (<ModeratorsList/>)}
        </List>
      </Drawer>
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div className={classes.drawerHeader} />
      <SwitchRoutes />
    </main>
      <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover/>
    </div>
  );
})


export default AdministrationView
