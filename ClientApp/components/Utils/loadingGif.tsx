import * as React from "react";
import { render } from "react-dom";



export class LoadingGif extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    public render() {
        return (<div> <img src="dist/loading.gif" /></div >);
    }
}