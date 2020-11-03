import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

import RoomIcon from '@material-ui/icons/Room';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';

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


export const ModeratorsList = () => {
  const classes = useStyles();
    return(
      <div>
          <Link className={classes.linkList} to="/publicPins">
            <ListItem className={classes.listItem} button>
              <ListItemIcon> 
                <RoomIcon fontSize="inherit" /> 
              </ListItemIcon>
              <ListItemText primary={"Public pins"} />
            </ListItem>
          </Link>
          <Link className={classes.linkList} to="/moderatedPins"> 
            <ListItem className={classes.listItem} button>
              <ListItemIcon> 
                <EditLocationIcon fontSize="inherit" />
              </ListItemIcon>
              <ListItemText primary={"Moderated pins"} ></ListItemText>
            </ListItem>
          </Link>
          <Link className={classes.linkList} to="/solvedPins">
            <ListItem className={classes.listItem} button>
              <ListItemIcon> 
                <OfflinePinIcon fontSize="inherit"/> 
              </ListItemIcon>
              <ListItemText primary={"Solved pins"} />
            </ListItem>
          </Link>
      </div>
    )
}