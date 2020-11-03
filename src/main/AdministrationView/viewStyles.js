import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 300

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      backgroundColor: "#F4F7FC",
      '& p, a, span, h6, h5, td, div': {
        fontWeight: "bold",
        color: "#808D93"
      },
      '& div[role=alert]':{
        color: "#FFFFFF"
      }
    },
    appBar: {
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: "#FFFFFF"
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    topToolBarMainText:{
      marginLeft: theme.spacing(8)
    },
    topToolBarMainTextOpen:{
      marginLeft: theme.spacing(1)
    },
    drawerMainText:{
      marginRight: theme.spacing(2),
      textDecoration: "none"
    },
    menuButton: {
      fontSize: "30px",
      marginLeft: theme.spacing(1),
      '&:hover .MuiSvgIcon-root':{
        color: "#FF5242" 
      }
    },
    hideComponent: {
      display: 'none',
    },
    chevronVisible:{
      display: 'inline-flex',
      '&:hover .MuiSvgIcon-root':{
        color: "#FF5242" 
      }
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1.5),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    toolBarLeft:{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    toolBarRight:{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    topToolBarUserName:{
        color: "#808D93",
        paddingRight: theme.spacing(2)
    },
    topToolBarDivider:{
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2) 
    },
    topToolBarContainer:{
      height: 64
    },
    defaultIconSize:{
        fontSize: "30px",
    },
    defaultIconHover:{
        '&:hover .MuiSvgIcon-root':{
            color: "#FF5242" 
        }        
    },
    content: {
      flexGrow: 1,
    }
  }));