import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

import RoomIcon from '@material-ui/icons/Room';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import OfflinePinIcon from '@material-ui/icons/OfflinePin';

const useStyles = makeStyles(theme => ({
  linkList:{
    fontSize: "36pt",
    color: "#DADBDB",
    textDecoration: "none"
  },
  listIcon:{
    color: '#DADBDB',
  },
  
}));



export const ModeratorsList = () => {
  const classes = useStyles();
  const theme = useTheme();

    return(
      <Box>
          <Link to="/publicPins">
            <ListItem button>
              <ListItemIcon> 
                <RoomIcon className={classes.listIcon} /> 
              </ListItemIcon>
              <ListItemText className={classes.linkList} primary={"Public pins"} />
            </ListItem>
          </Link>
          <Link to="/moderatedPins"> 
            <ListItem button>
              <ListItemIcon> 
                <EditLocationIcon className={classes.listIcon} />
              </ListItemIcon>
              <ListItemText className={classes.linkList} primary={"Moderated pins"} ></ListItemText>
            </ListItem>
          </Link>
          <Link to="/solvedPins">
            <ListItem button>
              <ListItemIcon> 
                <OfflinePinIcon className={classes.listIcon} /> 
              </ListItemIcon>
              <ListItemText className={classes.linkList} primary={"Solved pins"} />
            </ListItem>
          </Link>
      </Box>
    )
}