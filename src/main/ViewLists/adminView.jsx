import React from 'react'
import { ListItem, ListItemIcon, ListItemText, Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

import GroupIcon from '@material-ui/icons/Group';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';


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



export const AdminList = () => {
  const classes = useStyles();
  const theme = useTheme();

    return(
    <Box>
      <Link to="/statistics">
        <ListItem className={classes.linkList} button>
          <ListItemIcon> 
            <EqualizerIcon className={classes.listIcon} /> 
          </ListItemIcon>
          <ListItemText primary={"Statistic"} />
        </ListItem>
      </Link>
      <Link to="/users"> 
        <ListItem className={classes.linkList} button>
          <ListItemIcon> 
            <GroupIcon className={classes.listIcon} />
          </ListItemIcon>
          <ListItemText primary={"Users"} ></ListItemText>
        </ListItem>
      </Link>
      <Link to="/moderators">
        <ListItem className={classes.linkList} button>
          <ListItemIcon> 
            <SupervisorAccountIcon className={classes.listIcon} /> 
          </ListItemIcon>
          <ListItemText primary={"Moderators"} />
        </ListItem>
      </Link>
    </Box>
    )
}