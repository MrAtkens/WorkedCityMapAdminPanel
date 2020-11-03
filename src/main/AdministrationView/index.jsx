import React, { useContext } from 'react'
import { observer } from "mobx-react";
import { ToastContainer } from 'react-toastify'
import { useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, Typography, Divider, List,
IconButton, Avatar, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

import { SystemStoreContext } from 'store'
import SwitchRoutes from '../switchRouter'
import { ModeratorsList } from '../ViewLists/moderatorList'
import { AdminList } from '../ViewLists/adminView'
import { SuperAdminList } from '../ViewLists/superAdminView'
import { Role } from 'tools'

import {useStyles} from './viewStyles'


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

  const handleLogOut = () => {
    systemStore.logout()
  }

  return (
    <div className={classes.root}>
    <CssBaseline />
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar className={classes.topToolBar}>
        <Grid container className={classes.topToolBarContainer}>
          <Grid className={classes.toolBarLeft} item xs={6}>
            <Typography className={clsx(classes.topToolBarMainText, {
                [classes.topToolBarMainTextOpen]: open,
              })} variant="h6" noWrap>
              Worked City Maps
            </Typography>
          </Grid>
          <Grid className={classes.toolBarRight} item xs={6}>
            <Typography className={classes.topToolBarUserName} variant="h6" noWrap>
              {systemStore.showUserFullName}
            </Typography>
            <Avatar>
              <PersonIcon fontSize="inherit" className={classes.defaultIconSize} />
            </Avatar>
            <Divider className={classes.topToolBarDivider} orientation="vertical" />
            <IconButton onClick={handleLogOut} className={classes.defaultIconHover}>
              <ExitToAppRoundedIcon fontSize="inherit" className={classes.defaultIconSize}/>
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        {/* <Link to="/main"><Avatar alt="Worked city maps" src={'assets/img/logo.png'} className={classes.bigAvatar} /></Link> */}
        <Link className={classes.drawerMainText} to="/main"><Typography variant="h6" noWrap>Worked City Maps</Typography></Link>
        <IconButton className={clsx(classes.hideComponent, {
            [classes.chevronVisible]: open,
          })} onClick={handleDrawerClose}>
          <ChevronLeftIcon fontSize="inherit" className={classes.defaultIconSize} />
        </IconButton>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hideComponent]: open,
          })}
        >
        <MenuIcon fontSize="inherit" />
        </IconButton>
      </div>
      <Divider />
      <List>
          {systemStore.userRole === Role.SuperAdmin ? (
          <div>
            <SuperAdminList/>
            <AdminList/>
            <ModeratorsList/>
          </div>
          ): (systemStore.userRole === Role.Admin ? (<AdminList/>) : (<ModeratorsList/>))}
      </List>
    </Drawer>
    <main className={classes.content}>
      <div className={classes.toolbar} />
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
