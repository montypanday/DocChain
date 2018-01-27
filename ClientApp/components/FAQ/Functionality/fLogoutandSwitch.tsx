import * as React from "react";

export class Logout extends React.Component {

    public render() {
        return (<div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven">
                    How can I switch between storage providers and/or logout?
                        </a></h4>
            </div>
            <div id="collapseSeven" className="panel-collapse collapse">
                <div className="panel-body">
                    Currently users can remain logged in to all providers concurrently. To switch between logged-in services just navigate between the file explorers in the navbar, represented by their logos.
                    <br /><br />
                    To log out of a service:
                    <ul>
                        <li>Navigate to the respective file explorer as above</li>
                        <li>When a service is logged-in a red "Logout" button will be visible in the top right</li>
                        <li>To log out, click this button.</li>
                    </ul>
                </div>
            </div>
        </div>
        );
    }
}