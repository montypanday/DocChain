﻿import * as React from 'react';
import { render } from 'react-dom';
require('../css/breadcrumb.css');

export interface AppProps {
}

export interface AppState {
}

export class BreadCrumb extends React.Component<{ address }, {}> {
    address = "Home";
    constructor(prop) {
        super();
        this.address = prop.address
        this.state = {

        }
    }
    render() {
        if (this.address != "Home") {
            return (
                <div className="breadcrumb flat">
                    <a href="#" >All Files</a>
                    <a href="#" className="active">{this.address}</a>
                </div>
            );
        } else {
            return (
                <div className="breadcrumb flat">
                    <a href="#" >All Files</a>
                    <a href="#">Compare</a>
                    <a href="#">Order Confirmation</a>
                    <a href="#" className="active">Checkout</a>
                </div>
            );
        }

    }

}