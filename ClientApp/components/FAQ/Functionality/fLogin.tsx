import * as React from "react";

export class Login extends React.Component {

    public render() {
        return (<div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                    Logging in
                    </a>
                </h4>
            </div>
            <div id="collapseThree" className="panel-collapse collapse">
                <div className="panel-body">
                    <strong>DocChain</strong> Currently supports the service of 2 cloud storage providers: Google Drive & Box.com.
                          <ul>
                        <li>You can go straight to the <strong>"Account"</strong> page and choose your cloud storage provider.</li>
                        <li>Follow the guide and authorise <strong>DocChain</strong>.</li>
                        <li>You will the be redirected back to DocChain and the relevant file explorer</li>
                        OR
                        <li>Navigate directly to the file explorers in the navbar</li>
                        <li>If your details are logged, you will be able to begin using our service</li>
                        <li>or you will see a login alert, click it and follow the steps above.</li>
                    </ul>
                </div>
            </div>
        </div>
        );
    }
}