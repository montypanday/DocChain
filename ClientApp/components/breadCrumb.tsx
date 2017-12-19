﻿import * as React from 'react';
import { render } from 'react-dom';
require('../css/breadcrumb.css');

export interface AppProps {
}

export interface AppState {
}

export class BreadCrumb extends React.Component<{ address }, {}> {
    address = "Home";
    constructor(props) {
        super(props);
        this.address = props.address;
        this.state = {
        }
    }
    render() {
        if (this.address != "Home") {
            return (
                <div className="breadcrumb flat">
                    <a href="#" >Home</a>
                    <a href="#" className="active">{this.address}</a>
                </div>
            );
        } else {
            return (
                <div className="breadcrumb flat">
                    <a href="#" >Home</a>
                    <a href="#">Compare</a>
                    <a href="#">Order Confirmation</a>
                    <a href="#" className="active">Checkout</a>
                </div>
            );
        }

    }

}