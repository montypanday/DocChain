import * as React from "react";

export class Embedding extends React.Component {

    public render() {
        return (<div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive">
                    How can I embed my files into the blockchain? 
                        </a></h4>
            </div>
            <div id="collapseFive" className="panel-collapse collapse">
                <div className="panel-body">
                    Click at <b>Actions</b> button of the file, <b>Embed Into Blockchain</b>.
                    You can click at <b>Check with Blockchain</b> to check whether your file is changed after embeded. 
                </div>
            </div>
        </div>
        );
    }
}