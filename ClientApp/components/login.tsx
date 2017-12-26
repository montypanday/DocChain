import * as React from "react";
const s = require("../css/login.css");

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
        if (location.search != "") {
            const search = location.search;
            const params = new URLSearchParams(search);
            const AuthorizationCode = params.get("code");

            if (params.get("state") === "state_parameter_passthrough_value") {
                console.log("i will make a request to Google for access and refresh tokens.");
                fetch("https://www.googleapis.com/oauth2/v4/token?code=" + AuthorizationCode + "&client_id=900082198060-kdvsjc3ecm82gn48dl9083cg0gihggm1.apps.googleusercontent.com&redirect_uri=https://localhost:44374/Login/&client_secret=i1EN7mH7usgONgINmnNKbOFi&grant_type=authorization_code", { method: "POST" })
                    .then(response => response.json())
                    .then(data => {
                        console.log("this is access and refresh token");
                        console.log(data);
                        sessionStorage.setItem("google_access_token", data.access_token);
                        sessionStorage.setItem("google_refresh_token", data.refresh_token);
                    });
            } else {
                fetch("/api/Box/Authenticate/" + AuthorizationCode, { credentials: 'same-origin' })
                    .then(response => response)
                    .then(data => {

                    });
            }
        }


        if (sessionStorage.getItem("accessToken") == null) {

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
                    <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive&client_id=900082198060-kdvsjc3ecm82gn48dl9083cg0gihggm1.apps.googleusercontent.com&redirect_uri=https://localhost:44374/Login/&response_type=code&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&prompt=consent">
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
}