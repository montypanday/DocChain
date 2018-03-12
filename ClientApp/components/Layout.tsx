import * as React from "react";
import { NavMenu } from "./";
import { Alert } from "react-bootstrap";
require("font-awesome/css/font-awesome.min.css");
require("../css/onecss.css");

export interface LayoutProps {
    children?: React.ReactNode;
}


export interface LayoutState {
    errorFound: boolean;
    Error: any;
    errorInformation: any;
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props) {
        super(props);
    }
    

    public render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2" >
                    <NavMenu />
                </div>

                <div className="col-sm-10" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
