import * as React from "react";
import { render } from "react-dom";

var imageStyle = {
    "width": "100%",
    "textAlign": "center",
    "paddingTop": "90px",
    "left": "0",
    "right": "0",
};

export class LoadingGif extends React.Component<{}, {}> {
    constructor() {
        super();
    }
    public render() {
        return (<div style= { imageStyle } > <img src="dist/loading-animations-preloader-gifs-ui-ux-effects-18.gif" /></div >);
    }
}