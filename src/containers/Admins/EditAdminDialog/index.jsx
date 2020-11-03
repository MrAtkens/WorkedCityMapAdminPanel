import React, { useContext, useRef, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Slide, Divider,
Grid, LinearProgress, FormControl, InputLabel, FormControlLabel, Checkbox,
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

const EditAdminDialog = observer(() => {
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const systemStore = useContext(SystemStoreContext)
  const AdminStore = useContext(AdminStoreContext)
  const crudAdminStore = useContext(CRUDAdminStoreContext)
  const AdminEdit = crudAdminStore.AdminEdit
  const admin = systemStore.admin
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    if(crudAdminStore.isEditAdminOpenTrue){
      firstNameRef.current.value = AdminEdit.firstName
      lastNameRef.current.value = AdminEdit.lastName
    }
  })

  const handleDialogClose = () => {
    firstNameRef.current.value = ""
    lastNameRef.current.value = ""
    crudAdminStore.setIsEditAdminOpen(false)
    crudAdminStore.setPasswordStrength(0)
  };

  
  const handleClickShowPassword = () => {
    if(systemStore.isPasswordShow)
        systemStore.setIsPasswordShow(false)
    else
        systemStore.setIsPasswordShow(true)
  };  

  const handleCheckPasswordPosible = () => {
    if(crudAdminStore.isPasswordPosibleTrue)
      crudAdminStore.setIsPasswordPosible(false)
    else
      crudAdminStore.setIsPasswordPosible(true)
  }

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

  const validateValue = (firstName, lastName) => {
    if (firstName.length < 3 || firstName.length > 20)
      crudAdminStore.setFirstNameError(true)
    else
      crudAdminStore.setFirstNameError(false)
    if (lastName.length < 3 || lastName.length > 20)
      crudAdminStore.setLastNameError(true)
    else
      crudAdminStore.setLastNameError(false)
  };

  const hadleEditAdmin = () => {
    var password = ""
    if(crudAdminStore.isPasswordPosibleTrue)
      password = passwordRef.current.value
    else
      password = null
    console.log(password)
    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value
    validateValue(firstName, lastName)
    if (crudAdminStore.validateEditAdmin)
      toastValidationError();
    else 
      AdminStore.editAdmin(AdminEdit.id, AdminEdit.login, firstName, lastName, password, admin.id, admin.login).then(() => {
        if(AdminStore.isAdminEditedTrue){
          handleDialogClose()
        }
      });
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      fullScreen={fullScreen}
      open={crudAdminStore.isEditAdminOpen}
      TransitionComponent={Transition}
      onClose={handleDialogClose}
      keepMounted
      aria-labelledby="alert-dialog-title">
      <DialogTitle className="dio-title" id="alert-dialog-title">     
        Edit Admin 
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
            <Divider variant={"fullWidth"}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={crudAdminStore.firstNameError}
                label="First name"
                focused={true}
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
               focused={true}
               helperText="Admin last name"
               inputRef={lastNameRef}
               className="text-input"
               required
               variant="outlined"
               />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={crudAdminStore.isPasswordPosible}
                    onChange={handleCheckPasswordPosible}
                    name="passwordPossible"
                    color="primary"
                  />
                }
                label="If you need edit password click there"
              />
            </Grid>
            {crudAdminStore.isPasswordPosibleTrue ? (
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
                        labelWidth={70}
                    />
                  <FormHelperText error={crudAdminStore.passwordStrengthLess} id="password">Password must be eight characters or longer and contain at least 1 lowercase,
                  at least 1 uppercase alphabetical character, at least 1 numeric character, at least 1 special character</FormHelperText>
              </FormControl>
              </Grid>
            ): (null)}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleDialogClose} color="secondary">
          Cancel
        </Button>
        <Button variant="contained" onClick={hadleEditAdmin} color="primary">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default EditAdminDialog