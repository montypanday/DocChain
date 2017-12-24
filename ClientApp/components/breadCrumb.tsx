﻿import * as React from "react";
import { render } from "react-dom";
require("../css/breadcrumb.css");
export interface BreadCrumbProps {
    pathCollection: any;
    navigateOutHandler: any;
}
export class BreadCrumb extends React.Component<BreadCrumbProps, {}> {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps) {
        const newChanges = this.props.pathCollection !== nextProps.pathCollection;
        return newChanges;
    }
    render() {
        console.log("Breadcrumb was rendered");
        var pathElements = this.props.pathCollection.map(function (row) {
            return (<a key={row.fileID} onClick={() => { this.props.navigateOutHandler(row); }}>{row.Name}</a>);
        }.bind(this));
        return (
            <div className="breadcrumb flat">
                {pathElements}
            </div>
        );
    }
}