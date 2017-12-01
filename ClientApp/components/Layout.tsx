import * as React from "react";
import { NavMenu } from "./NavMenu";

export interface LayoutProps {
    children?: React.ReactNode;
}

var divstyle = {
    "padding": "3px"
};
export class Layout extends React.Component<LayoutProps, {}> {

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
        </div>;
    }
}
