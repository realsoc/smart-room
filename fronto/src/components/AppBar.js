import {LIGHT_MODE} from '../constants/lights.js';
import React from 'react';
import './AppBar.css';

export default class AppBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lightMode : LIGHT_MODE.RGB,
            temperature : 19,
            rgb : 0x000,
        }
    }
    render() {
        return(
            <div className="header"
            style ={getStyle(this.state.lightMode, this.state.temperature)}>
            Chambre
            </div>
        );
    }
}

function getStyle(lightMode, temperature) {
    var background, textColor;
    switch(lightMode) {
        case LIGHT_MODE.OFF:
            background = '#000';
            break;
        case LIGHT_MODE.UV:
            background = '#1b263b';
            break;
        case LIGHT_MODE.RGB:
        default:
            background = '#ffecd1';
            break;
    }
    if (isNaN(temperature)) { textColor = '#000' } else
    if (temperature < 18) { textColor = '#1e96fc' } else
    if (temperature <= 21) { textColor = '#04e762' }
    else { textColor = '#dd1c1a' }
    return getStyleWith(background, textColor);
}
function getStyleWith(background, textColor) {
    return {
        background: background,
        color: textColor,
        fontSize: '3.2em',
        fontWeight: 'bold',
        fontFamily: 'Courier'
    }
};
