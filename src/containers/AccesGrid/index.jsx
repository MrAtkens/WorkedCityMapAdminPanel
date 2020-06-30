import React, { useContext, useState, useEffect, useRef } from 'react'
import { Grid, Divider, Typography, Paper, Box, TextField, Button, FormControl, InputLabel, 
    OutlinedInput, InputAdornment, IconButton, FormHelperText, Grow } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';

import { SystemStoreContext } from 'store'
import { toastAuthorizeValidationError } from 'tools'


import './style.scss'

const AccesGrid = () => {
    const loginRef = useRef(null);
    const passwordRef = useRef(null);
    const systemStore = useContext(SystemStoreContext);

    const [showPassword, setShowPassword] = React.useState({
        showPassword: false,
      });

    const validateValue = (login, password) => {
        if (login.length < 5 || login.length > 20) 
            systemStore.setLoginError(true);
        else
            systemStore.setLoginError(false);
        if (password.length < 8 || password.length > 20)
            systemStore.setPasswordError(true);
        else 
            systemStore.setPasswordError(false);
    };

    const singInClick = () => {
        const login = loginRef.current.value;
        const password = passwordRef.current.value;
        validateValue(login, password);
        if (systemStore.loginError || systemStore.passwordError)
            toastAuthorizeValidationError();
        else 
            systemStore.singIn(login, password);
    }

    const handleClickShowPassword = () => {
        setShowPassword({ showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    

    return(
        <Box className="background">
            <Grid container>
                <Grid xs={4}/>
                <Grid xs={12} sm={4}>
                    <Grow in={true} mountOnEnter unmountOnExit>
                        <Paper className="form-paper" elevation={3}>
                            <Paper className="form-unlock">
                                <LockIcon className="lock-icon"/>
                            </Paper>
                            <form className="form-control">
                                <Typography className="main-header-form" variant="h2">Sing In</Typography>
                                <Divider variant={"fullWidth"}/>
                                <TextField
                                    label="Login"
                                    helperText="Need yout login to sing in to system"
                                    inputRef={loginRef}
                                    className="form-input"
                                    required
                                    variant="outlined"
                                />
                                <FormControl className="form-input" variant="outlined">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        inputRef={passwordRef}
                                        id="password"
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                    <FormHelperText id="password">Need password to sing in</FormHelperText>
                                </FormControl>
                                <Divider variant={"fullWidth"}/>
                                <Button onClick={singInClick} className="form-button" variant="contained" color="primary">Sing in</Button>
                            </form>
                        </Paper>
                    </Grow>
                </Grid>
                <Grid xs={4}/>
            </Grid>
        </Box>
    )
}

export default AccesGrid