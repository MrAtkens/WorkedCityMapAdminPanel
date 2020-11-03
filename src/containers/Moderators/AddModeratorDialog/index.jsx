import React, { useContext, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Slide, Divider,
Grid, LinearProgress, FormControl, InputLabel,
OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { observer } from "mobx-react";

import { SystemStoreContext, ModeratorStoreContext, CRUDModeratorStoreContext } from "store";
import { toastValidationError, mediumRegex, strongRegex } from "tools";

import "./style.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddModeratorDialog = observer(() => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const systemStore = useContext(SystemStoreContext)
  const moderatorStore = useContext(ModeratorStoreContext)
  const crudModeratorStore = useContext(CRUDModeratorStoreContext)
  const admin = systemStore.admin
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleDialogClose = () => {
    crudModeratorStore.setIsAddModeratorOpen(false)
    crudModeratorStore.setPasswordStrength(0)
  };
  
  const handleClickShowPassword = () => {
    if(systemStore.isPasswordShow)
      systemStore.setIsPasswordShow(false)
    else
      systemStore.setIsPasswordShow(true)
  };

  const validatePassword = () => {  
    if(passwordRef.current !== null){
    const password = passwordRef.current.value
      if(strongRegex.test(password)) {
        crudModeratorStore.setPasswordStrength(100)
      } else if(mediumRegex.test(password)) {
        crudModeratorStore.setPasswordStrength(70)
      } else {
        crudModeratorStore.setPasswordStrength(40)
      }
    }
  }

  const validateValue = (login, firstName, lastName) => {
    if (login.length < 4 || login.length > 16) 
      crudModeratorStore.setLoginError(true)
    else
      crudModeratorStore.setLoginError(false)
    if (firstName.length < 3 || firstName.length > 20)
      crudModeratorStore.setFirstNameError(true)
    else
      crudModeratorStore.setFirstNameError(false)
    if (lastName.length < 3 || lastName.length > 20)
      crudModeratorStore.setLastNameError(true)
    else
      crudModeratorStore.setLastNameError(false)
  };
  
  const handleAddModerator = () => {
    const login = loginRef.current.value
    const password = passwordRef.current.value
    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value

    validateValue(login, firstName, lastName);
    if (crudModeratorStore.validateAddModerator)
      toastValidationError();
    else
      moderatorStore.addModerator(login, password, firstName, lastName, admin.id).then(() => {
      if(moderatorStore.isModeratorAddedTrue){
        handleDialogClose()
      }
    });
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      fullScreen={fullScreen}
      open={crudModeratorStore.isAddModeratorOpen}
      TransitionComponent={Transition}
      onClose={handleDialogClose}
      keepMounted
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle className="dio-title" id="alert-dialog-title">     
        Add Moderator 
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
            <Divider variant={"fullWidth"}/>
              <TextField
                error={crudModeratorStore.loginError}
                label="Login"
                autoFocus
                helperText="Moderator login be 4 characters or longer"
                inputRef={loginRef}
                className="text-input"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                error={crudModeratorStore.firstNameError}
                label="First name"
                helperText="Moderator first name"
                inputRef={firstNameRef}
                className="text-input"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                error={crudModeratorStore.lastNameError}
                label="Last name"
                helperText="Moderator last name"
                inputRef={lastNameRef}
                className="text-input"
                required
                variant="outlined"
                />
            </Grid>
              <Grid item xs={12}>
              {crudModeratorStore.passwordStrengthLess ? (<LinearProgress variant="determinate" color="secondary" value={crudModeratorStore.passwordStrength} />):
              (<LinearProgress variant="determinate" color="primary" value={crudModeratorStore.passwordStrength} />)}
              <FormControl className="form-input" variant="outlined">
                <InputLabel error={crudModeratorStore.passwordStrengthLess} htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        inputRef={passwordRef}
                        error={crudModeratorStore.passwordStrengthLess}
                        id="password"
                        onChange={validatePassword}
                        required
                        type={systemStore.isPasswordShow ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end">
                            {systemStore.isPasswordShow ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>}
                        labelWidth={80}
                    />
                  <FormHelperText error={crudModeratorStore.passwordStrengthLess} id="password">Password must be eight characters or longer and contain at least 1 lowercase,
                  at least 1 uppercase alphabetical character, at least 1 numeric character, at least 1 special character</FormHelperText>
              </FormControl>
              </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleDialogClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAddModerator} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AddModeratorDialog