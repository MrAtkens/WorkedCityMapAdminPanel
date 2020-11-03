import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

import EqualizerIcon from '@material-ui/icons/Equalizer';
import VerifiedUserSharpIcon from '@material-ui/icons/VerifiedUserSharp';
import AssignmentIndSharpIcon from '@material-ui/icons/AssignmentIndSharp';

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



export const AdminList = () => {
  const classes = useStyles();

    return(
      <div>
      <Link className={classes.linkList} to="/statistics">
        <ListItem className={classes.listItem} button>
          <ListItemIcon> 
            <EqualizerIcon fontSize="inherit" /> 
          </ListItemIcon>
          <ListItemText primary={"Statistic"} />
        </ListItem>
      </Link>
      <Link className={classes.linkList} to="/users"> 
        <ListItem className={classes.listItem} button>
          <ListItemIcon> 
            <AssignmentIndSharpIcon fontSize="inherit" />
          </ListItemIcon>
          <ListItemText primary={"Users"} ></ListItemText>
        </ListItem>
      </Link>
      <Link className={classes.linkList} to="/moderators">
        <ListItem className={classes.listItem} button>
          <ListItemIcon> 
            <VerifiedUserSharpIcon fontSize="inherit" /> 
          </ListItemIcon>
          <ListItemText primary={"Moderators"} />
        </ListItem>
      </Link>
      </div>
    )
}