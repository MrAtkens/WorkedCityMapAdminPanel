import React, { useContext, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Slide, Divider,
Grid, LinearProgress, FormControl, InputLabel,
OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { observer } from "mobx-react";

import { SystemStoreContext, AdminStoreContext, CRUDAdminStoreContext } from "store";
import { toastValidationError, mediumRegex, strongRegex } from "tools";

import "./style.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddAdminDialog = observer(() => {
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const systemStore = useContext(SystemStoreContext)
  const adminStore = useContext(AdminStoreContext)
  const crudAdminStore = useContext(CRUDAdminStoreContext)
  const admin = systemStore.admin
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const handleDialogClose = () => {
    crudAdminStore.setIsAddAdminOpen(false)
    crudAdminStore.setPasswordStrength(0)
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
        crudAdminStore.setPasswordStrength(100)
      } else if(mediumRegex.test(password)) {
        crudAdminStore.setPasswordStrength(70)
      } else {
        crudAdminStore.setPasswordStrength(40)
      }
    }
  }

  const validateValue = (login, firstName, lastName) => {
    if (login.length < 4 || login.length > 16) 
      crudAdminStore.setLoginError(true)
    else
      crudAdminStore.setLoginError(false)
    if (firstName.length < 3 || firstName.length > 20)
      crudAdminStore.setFirstNameError(true)
    else
      crudAdminStore.setFirstNameError(false)
    if (lastName.length < 3 || lastName.length > 20)
      crudAdminStore.setLastNameError(true)
    else
      crudAdminStore.setLastNameError(false)
  };
  
  const handleAddAdmin = () => {
    const login = loginRef.current.value
    const password = passwordRef.current.value
    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value

    validateValue(login, firstName, lastName);
    if (crudAdminStore.validateAddAdmin)
      toastValidationError();
    else
      adminStore.addAdmin(login, password, firstName, lastName, admin.id).then(() => {
      if(adminStore.isAdminAddedTrue){
        handleDialogClose()
      }
    });
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      fullScreen={fullScreen}
      open={crudAdminStore.isAddAdminOpen}
      TransitionComponent={Transition}
      onClose={handleDialogClose}
      keepMounted
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle className="dio-title" id="alert-dialog-title">     
        Add Admin 
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
            <Divider variant={"fullWidth"}/>
              <TextField
                error={crudAdminStore.loginError}
                label="Login"
                autoFocus
                helperText="Admin login be 4 characters or longer"
                inputRef={loginRef}
                className="text-input"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                error={crudAdminStore.firstNameError}
                label="First name"
                helperText="Admin first name"
                inputRef={firstNameRef}
                className="text-input"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                error={crudAdminStore.lastNameError}
                label="Last name"
                helperText="Admin last name"
                inputRef={lastNameRef}
                className="text-input"
                required
                variant="outlined"
                />
            </Grid>
              <Grid item xs={12}>
              {crudAdminStore.passwordStrengthLess ? (<LinearProgress variant="determinate" color="secondary" value={crudAdminStore.passwordStrength} />):
              (<LinearProgress variant="determinate" color="primary" value={crudAdminStore.passwordStrength} />)}
              <FormControl className="form-input" variant="outlined">
                <InputLabel error={crudAdminStore.passwordStrengthLess} htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        inputRef={passwordRef}
                        error={crudAdminStore.passwordStrengthLess}
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
                  <FormHelperText error={crudAdminStore.passwordStrengthLess} id="password">Password must be eight characters or longer and contain at least 1 lowercase,
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
        <Button variant="contained" onClick={handleAddAdmin} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AddAdminDialog