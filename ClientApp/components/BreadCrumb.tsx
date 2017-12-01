import * as React from 'react';
import { render } from 'react-dom';

export class BreadCrumb extends React.Component<{address}, {}> {
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
                <div className="breadCrumbDiv">
                    <h3><br /></h3>
                    <ol className="breadcrumb">
                        <li><a href="../">Home</a></li>
                        <li className="active">{this.address}</li>
                    </ol>
                </div>
            );
        } else {
            return (
                <div className="breadCrumbDiv">
                    <h3><br /></h3>
                    <ol className="breadcrumb">
                        <li className="active">{this.address}</li>
                    </ol>
                </div>
            );
        }
        
    }

}


