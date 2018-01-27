import * as React from "react";

export class About extends React.Component {

    public render() {
        return (<div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                        What is <strong>DocChain</strong>?
                    </a>
                </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse in">
                <div className="panel-body">
                    <strong>DocChain</strong> aims to introduce blockchain technology to current cloud storage users.
                    <br/>
                    <br />
                    By combining LINCD.com's blockchain with various cloud storage platforms, <strong>DocChain</strong> allows users to calculate and store the hash of documents on the blockchain and retrieve it in future to check the integrity of their documents or to prove it's existence and track interactions performed on their files.
                    </div>
                </div>
            </div>
        );
    }
}