import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, List,
IconButton, ListItem, ListItemIcon, ListItemText, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PaymentIcon from '@material-ui/icons/Payment';
import CategoryIcon from '@material-ui/icons/Category';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

import { SystemStoreContext } from 'store'
import switchRoutes from './switchRoutesAdmin'
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
    textDecoration: 'none',
    color: 'white'
  },
  linkList:{
    fontSize: "36pt",
    color: "#DADBDB",
    textDecoration: 'none',
  },
  listIcon:{
    color: '#DADBDB',
  }
}));




const AdminView = () =>{
  const classes = useStyles();
  const theme = useTheme();
  const system = useContext(SystemStoreContext);
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
        <Divider />
        <List>
          <Link to="/categorie"> 
            <ListItem className={classes.linkList} button>
              <ListItemIcon> 
                <CategoryIcon className={classes.listIcon} />
              </ListItemIcon>
              <ListItemText primary={"Categories"} ></ListItemText>
            </ListItem>
          </Link>
          <Link to="/users">
            <ListItem className={classes.linkList} button>
              <ListItemIcon> 
                <AccountCircleIcon className={classes.listIcon} /> 
              </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItem>
          </Link>
          <Link to="/orders">
            <ListItem className={classes.linkList} button>
              <ListItemIcon> 
                <PaymentIcon className={classes.listIcon} /> 
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <div className={classes.drawerHeader} />
      {switchRoutes}
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
}


export default AdminView
