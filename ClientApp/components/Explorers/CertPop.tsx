﻿import * as React from "react";
import { render } from "react-dom";
import { Popover } from 'react-bootstrap';

export class CertPop extends React.Component<{}> {
    constructor(props) {
        super(props);


        this.state = {
            showCert: false
        }
    }


    render() {
        console.log("cert was rendered");

        return (
            <Popover id="popover-trigger-click-root-close" placement="right" title="File Certificate">
                Here is where certificate data goes
	        </Popover>   
        );
    }
}