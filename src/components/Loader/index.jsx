import React from 'react';
import { Box } from '@material-ui/core'
import './style.scss'
const Loader = () => {
    return(
        <Box height={1} width={1} className="loader-wrapper">
            <img className="logo" src="assets/img/loader.png" alt="Worked city maps logo"/>
        </Box>
    )
}

export default Loader