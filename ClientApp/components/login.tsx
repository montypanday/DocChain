import * as React from "react";

interface LoginState {
    loggedIn: boolean;
}

export class Login extends React.Component<{}, LoginState> {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }
    render() {
            return (<div className="body">
                <div className="grid-container">
                    <div className="select">
                        <p> Select your cloud storage provider </p>
                    </div>
                    {/*<a href="https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=2e5c31a7-72e0-4e93-9def-581432e66277&scope=files.readwrite.all&response_type=code&redirect_uri=https://localhost:44374/Login/">*/}
                    <a /*onClick={this.launchOneDrive}*/>
                        <div className="onedrive">
                            <section className="onedrive-logo"></section>
                            <p>OneDrive (TBD)</p>
                        </div>
                    </a>
                    <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive&client_id=900082198060-kdvsjc3ecm82gn48dl9083cg0gihggm1.apps.googleusercontent.com&redirect_uri=https://localhost:44374/api/Google/Authenticate&response_type=code&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&prompt=consent">
                        <div className="googledrive">
                            <section className="googledrive-logo"></section>
                            <p>Google Drive</p>
                        </div>
                    </a>
                    <a /*onClick={this.launchDropBox}*/ >
                        <div className="dropbox">
                            <section className="dropbox-logo"></section>
                            <p>Dropbox (TBD)</p>
                        </div>
                    </a>
                    <a href="https://account.box.com/api/oauth2/authorize?response_type=code&client_id=3syx1zpgoraznjex526u78ozutwvgeby&state=security_token%3DKnhMJatFipTAnM0nHlZA">
                        <div className="box">
                            <section className="box-logo"></section>
                            <p>Box</p>
                        </div>
                    </a>
                </div>
            </div>
            );
        }
    }
