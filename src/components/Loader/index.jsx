import React from 'react';
import { Box } from '@material-ui/core'
import './style.scss'

const Loader = (props) => {
    return(
        <Box height={1} width={1} className={props.status ? "loader-wrapper loader-active" : "loader-wrapper loader-inactive"}>
            <img className="logo" src="assets/img/loader.png" alt="Worked city maps logo"/>
        </Box>
    )
}

export default Loader