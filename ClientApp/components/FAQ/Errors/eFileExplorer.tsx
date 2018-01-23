import * as React from "react";

export class FileExplorer extends React.Component {

    public render() {
        return (<div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseEight">
                    Why there is an error when I attempt to access a <strong>file explorer</strong>?
                        </a></h4>
            </div>
            <div id="collapseEight" className="panel-collapse collapse">
                <div className="panel-body">
                    <ul>
                        <li>1. Please check your network connection.</li>
                        <li>2. Please check your account</li>
                    </ul>
                </div>
            </div>
        </div>
        );
    }
}