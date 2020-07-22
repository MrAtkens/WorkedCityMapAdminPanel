import React, { useContext, useRef } from 'react'
import { ToastContainer } from 'react-toastify' 
import { observer } from 'mobx-react'
import { Grid, Divider, Typography, Paper, Box, TextField, Button, FormControl, InputLabel, 
    OutlinedInput, InputAdornment, IconButton, FormHelperText, Grow } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';

import { SystemStoreContext } from 'store'
import { toastAuthorizeValidationError } from 'tools'


import './style.scss'

const AccesGrid = observer(() => {
    const loginRef = useRef(null);
    const passwordRef = useRef(null);
    const systemStore = useContext(SystemStoreContext);


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
        if(systemStore.isPasswordShow)
            systemStore.setIsPasswordShow(false)
        else
            systemStore.setIsPasswordShow(true)
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return(
        <Box className="background">
            <Grid container>
                <Grid item xs={4}/>
                <Grid item xs={12} sm={4}>
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
                                    error={systemStore.loginError}
                                    helperText="Need yout login to sing in to system"
                                    inputRef={loginRef}
                                    className="form-input"
                                    required
                                    variant="outlined"
                                />
                                <FormControl className="form-input" variant="outlined">
                                    <InputLabel error={systemStore.passwordError} htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        inputRef={passwordRef}
                                        error={systemStore.passwordError}
                                        id="password"
                                        required
                                        type={systemStore.isPasswordShow ? 'text' : 'password'}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {systemStore.isPasswordShow ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={70}
                                    />
                                    <FormHelperText error={systemStore.passwordError} id="password">Need password to sing in</FormHelperText>
                                </FormControl>
                                <Divider variant={"fullWidth"}/>
                                <Button onClick={singInClick} className="form-button" variant="contained" color="primary">Sing in</Button>
                            </form>
                        </Paper>
                    </Grow>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
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
        </Box>
    )
})

export default AccesGrid