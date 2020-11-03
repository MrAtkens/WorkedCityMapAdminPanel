import React, { useContext, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions,
Button, Typography, TextField, Slide, Grid } from "@material-ui/core";

import { DropzoneArea } from "material-ui-dropzone";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { observer } from "mobx-react"; // 6.x or mobx-react-lite@1.4.0

import { SystemStoreContext, PinCreateContext } from "store";
import { toastValidationError } from "tools";

import "./style.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateDialogAccept = observer(props => {
  const systemStore = useContext(SystemStoreContext);
  const pinCreateStore = useContext(PinCreateContext);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleDialogClose = () => {
    pinCreateStore.setIsOpen(false);
  };

  const handleImagesUpload = images => {
    pinCreateStore.setImages(images);
  };

  const validateValue = (name, description) => {
    if (name.length < 6 || name.length > 80) pinCreateStore.setNameError(true);
    else pinCreateStore.setNameError(false);
    if (description.length < 50 || description.length > 300)
      pinCreateStore.setDescriptionError(true);
    else pinCreateStore.setDescriptionError(false);
    if (pinCreateStore.images.length < 1) pinCreateStore.setImagesError(true);
    else pinCreateStore.setImagesError(false);
  };

  const handleAddPin = () => {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    validateValue(name, description);
    if (
      pinCreateStore.nameError ||
      pinCreateStore.descriptionError ||
      pinCreateStore.imagesError
    )
      toastValidationError();
    else 
      pinCreateStore.addProblemPin(name, description);
  };

  const isPinAdded = () => {
    if (pinCreateStore.isCreated) 
      pinCreateStore.setIsOpen(false);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      fullScreen={fullScreen}
      open={pinCreateStore.isOpen}
      TransitionComponent={Transition}
      onClose={handleDialogClose}
      keepMounted
      aria-labelledby="alert-dialog-title"
    >
      {isPinAdded()}
      <DialogTitle className="dio-title" id="alert-dialog-title">
        Если вы хотите сообщить о проблеме связанной с инфраструктурой города к
        примеру: поломанный бордюр, открытый люк или побитая дорога. + Вам надо
        заполнить данные и отправить их нам на модерацию. Дабы наша работа
        проходила быстрее пожалуйста вводите нормальные имена и описание
        проблемы, также загружайте фотографий связанные с проблемой которую вы
        хотите описать
      </DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12}>
              <TextField
                error={pinCreateStore.nameError}
                label="Введите название проблемы"
                helperText="Название должно иметь больше 4 знаков"
                inputRef={nameRef}
                autoFocus
                className="text-input"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={pinCreateStore.descriptionError}
                label="Введите описание проблемы"
                helperText="Описание желательно писать развёрнутым и больше 50 символов и меньше 300 симолов"
                inputRef={descriptionRef}
                className="text-input"
                required
                multiline
                variant="outlined"
              />
            </Grid>
            <Grid className="dropzone" item xs={12}>
              {pinCreateStore.imagesError === true ? (
                <Typography className="upload-error" variant={"subtitle2"}>
                  Вам необходимо загрузить хотябы одну фотографию связанную с
                  проблемой
                </Typography>
              ) : null}
              <DropzoneArea
                required
                showAlerts={true}
                filesLimit={10}
                showFileNames={true}
                acceptedFiles={["image/*"]}
                dropzoneText={
                  "Добавьте фотографий связанные с проблемой, максимальное количество 10 фотографий."
                }
                onChange={images => handleImagesUpload(images)}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Я не чайно нажал
        </Button>
        <Button onClick={handleAddPin} color="primary">
          Отправить данные о проблеме
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default CreateDialogAccept;
