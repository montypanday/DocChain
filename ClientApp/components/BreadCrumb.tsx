﻿import * as React from "react";
import { render } from "react-dom";

export interface BreadCrumbProps {
    pathCollection: any;
    navigateOutHandler: any;
}


export class BreadCrumb extends React.Component<BreadCrumbProps, {}> {
    constructor(props) {
        super(props);

    }
    shouldComponentUpdate(nextProps) {
        const a = this.props.pathCollection !== nextProps.pathCollection;
        return a;
    }
    render() {
        var pathElements = this.props.pathCollection.map(function (row) {
            return (<a key={row.fileId}  onClick={() => { this.props.navigateOutHandler(row); }}>{row.Name}</a>);
        }.bind(this));
        return (
            <div className="breadcrumb flat">
                {pathElements}
            </div>
        );
    }
}