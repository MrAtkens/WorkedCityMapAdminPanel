import React, { useContext, useRef, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Slide, Divider,
Grid, LinearProgress, FormControl, InputLabel, FormControlLabel, Checkbox,
OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { observer } from "mobx-react";

import { SystemStoreContext, ModeratorStoreContext, CRUDModeratorStoreContext } from "store";
import { toastValidationError, mediumRegex, strongRegex } from "./node_modules/tools";

import "./style.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditModeratorDialog = observer(() => {
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const systemStore = useContext(SystemStoreContext)
  const moderatorStore = useContext(ModeratorStoreContext)
  const crudModeratorStore = useContext(CRUDModeratorStoreContext)
  const moderatorEdit = crudModeratorStore.moderatorEdit
  const admin = systemStore.admin
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    if(crudModeratorStore.isEditModeratorOpenTrue){
      firstNameRef.current.value = moderatorEdit.firstName
      lastNameRef.current.value = moderatorEdit.lastName
    }
  })

  const handleDialogClose = () => {
    firstNameRef.current.value = ""
    lastNameRef.current.value = ""
    crudModeratorStore.setIsEditModeratorOpen(false)
    crudModeratorStore.setPasswordStrength(0)
  };

  
  const handleClickShowPassword = () => {
    if(systemStore.isPasswordShow)
        systemStore.setIsPasswordShow(false)
    else
        systemStore.setIsPasswordShow(true)
  };  

  const handleCheckPasswordPosible = () => {
    if(crudModeratorStore.isPasswordPosibleTrue)
      crudModeratorStore.setIsPasswordPosible(false)
    else
      crudModeratorStore.setIsPasswordPosible(true)
  }

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

  const validateValue = (firstName, lastName) => {
    if (firstName.length < 3 || firstName.length > 20)
      crudModeratorStore.setFirstNameError(true)
    else
      crudModeratorStore.setFirstNameError(false)
    if (lastName.length < 3 || lastName.length > 20)
      crudModeratorStore.setLastNameError(true)
    else
      crudModeratorStore.setLastNameError(false)
  };

  const hadleEditModerator = () => {
    var password = ""
    if(crudModeratorStore.isPasswordPosibleTrue)
      password = passwordRef.current.value
    else
      password = null
    console.log(password)
    const firstName = firstNameRef.current.value
    const lastName = lastNameRef.current.value
    validateValue(firstName, lastName)
    if (crudModeratorStore.validateEditModerator)
      toastValidationError();
    else 
      moderatorStore.editModerator(moderatorEdit.id, moderatorEdit.login, firstName, lastName, password, admin.id, admin.login).then(() => {
        if(moderatorStore.isModeratorEditedTrue){
          handleDialogClose()
        }
      });
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      fullScreen={fullScreen}
      open={crudModeratorStore.isEditModeratorOpen}
      TransitionComponent={Transition}
      onClose={handleDialogClose}
      keepMounted
      aria-labelledby="alert-dialog-title">
      <DialogTitle className="dio-title" id="alert-dialog-title">     
        Edit Moderator 
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
            <Divider variant={"fullWidth"}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={crudModeratorStore.firstNameError}
                label="First name"
                focused={true}
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
               focused={true}
               helperText="Moderator last name"
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
                    checked={crudModeratorStore.isPasswordPosible}
                    onChange={handleCheckPasswordPosible}
                    name="passwordPossible"
                    color="primary"
                  />
                }
                label="If you need edit password click there"
              />
            </Grid>
            {crudModeratorStore.isPasswordPosibleTrue ? (
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
                        labelWidth={70}
                    />
                  <FormHelperText error={crudModeratorStore.passwordStrengthLess} id="password">Password must be eight characters or longer and contain at least 1 lowercase,
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
        <Button variant="contained" onClick={hadleEditModerator} color="primary">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default EditModeratorDialog