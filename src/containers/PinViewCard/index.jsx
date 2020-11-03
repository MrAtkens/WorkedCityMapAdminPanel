import React, { useContext } from "react"
import { Button, Grid, Typography} from "@material-ui/core";
import AwesomeSlider from 'react-awesome-slider';
import { observer } from 'mobx-react'

import { mapStore }  from 'store'

import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import './style.scss'

const PinViewCard = observer(() => {
    const mapStore = useContext(mapStore)
    
        return (
            <Grid className="mainGrid" container>
                <Grid className="grid-image" item xs={12}>
                    <AwesomeSlider className="aws-btn" animation="cubeAnimation" organic-arrow-thickness={8}>
                        {mapStore.mapPin.images.map(image => {
                            return (<div className="div-image" data-src={`${image.webImagePath}`} key={image.alt}>
                                <p>Прокрутите вниз для того чтобы узнать инфромацию</p>
                            </div>)
                        })}
                    </AwesomeSlider>
                </Grid>
                <Grid className="grid-description" item xs={12}>
                    <Typography className="typ-headers" variant={"h1"}>
                        {mapStore.mapPin.name}
                    </Typography>
                    <Typography className="typ-headers" variant={"h3"}>
                        {mapStore.mapPin.address}
                    </Typography>
                    <Typography className="typ-headers" variant={"h4"}>
                        {mapStore.mapPin.creationDate}
                    </Typography>
                    <Typography className="typ-headers" variant={"h4"}>Описание проблемы</Typography>
                    <Typography className="description" variant="h5" gutterBottom>
                        {mapStore.mapPin.problemDescription}
                    </Typography>
                </Grid>
            </Grid>
        )
})

export default PinViewCard