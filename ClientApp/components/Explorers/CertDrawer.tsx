﻿import * as React from "react";
import { render } from "react-dom";
import { OverlayTrigger } from 'react-bootstrap';
import { CertPop } from './CertPop';
import { Button } from 'react-bootstrap';

export interface CertState {
    showCert: any;
}

export class CertDrawer extends React.Component<{},CertState> {
    constructor(props) {
        super(props);

        this.closeCerts = this.closeCerts.bind(this);
        this.showCerts = this.showCerts.bind(this);

        this.state = {
            showCert: false
        }
    }

    showCerts() { this.setState({ showCert: true }); }

    closeCerts() { this.setState({ showCert: false }); }

    render() {
        console.log("cert was rendered");

        return (
            <Button className="history action-btn btn-line" onFocus={this.showCerts} onBlur={this.closeCerts} > <i className="fa fa-history"></i>
                {this.state.showCert ? <CertPop /> : ""}
            </Button>
        );
    }
}