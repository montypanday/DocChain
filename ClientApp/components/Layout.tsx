import * as React from "react";
import { NavMenu } from "./NavMenu";
import { Alert } from 'react-bootstrap';

export interface LayoutProps {
    children?: React.ReactNode;
}

var divstyle = {
    "padding": "3px"
};

export interface LayoutState {
    errorFound: boolean,
    Error: any,
    errorInformation: any
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
    constructor(props) {
        super(props);
        this.state = {
            Error :"",
            errorFound: false,
            errorInformation: ""
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ Error: error, errorFound: true, errorInformation: errorInfo });
    }

    public render() {
        return <div className="container-fluid">
            <div className="row">
                <div >
                    <NavMenu />
                </div>
                <div style={divstyle}>
                    { this.props.children }
                </div>
            </div>
            {this.state["errorFound"] && <Alert bsStyle="warning">
                <strong> this.state["Error"] </strong> this.state["errorInformation"]
            </Alert>}
        </div>;
    }
}
