import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
const useStyles = makeStyles(theme => ({
  linkList:{
    fontSize: "36pt",
    textDecoration: "none",
  },
  listItem:{
    color: "#808D93",
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    '&:hover':{
      borderLeft: "4px solid #FF5242",
      transformOrigin: "top",
      transition: "height .5s ease 1.5s",
      height: "100%"
    },
    '& .MuiListItemIcon-root':{
      fontSize: "30px",
    },
    '&:hover .MuiListItemIcon-root': { 
      color: "#FF5242"
     },
    '&:hover .MuiListItemText-primary':{
      color: "#FF5242"
    }
  }
}));



export const SuperAdminList = () => {
  const classes = useStyles();

    return(
      <Link className={classes.linkList} to="/admins">
        <ListItem className={classes.listItem} button>
          <ListItemIcon> 
            <SupervisorAccountIcon fontSize="inherit" /> 
          </ListItemIcon>
          <ListItemText primary={"Admins"} />
        </ListItem>
      </Link>
    )
}