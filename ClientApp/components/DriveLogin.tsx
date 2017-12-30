import * as React from "react";
require("../css/singleLogin.css");

interface LoginState {
    loggedIn: boolean;
}

export class DriveLogin extends React.Component<{}, LoginState> {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }

    public render() {

        if (location.search != "") {
            const search = location.search;
            const params = new URLSearchParams(search);
            const AuthorizationCode = params.get("code");

            if (params.get("state") === "state_parameter_passthrough_value") {
                console.log("i will make a request to Google for access and refresh tokens.");
                fetch("https://www.googleapis.com/oauth2/v4/token?code=" + AuthorizationCode + "&client_id=900082198060-kdvsjc3ecm82gn48dl9083cg0gihggm1.apps.googleusercontent.com&redirect_uri=https://localhost:44374/driveExplorer/&client_secret=i1EN7mH7usgONgINmnNKbOFi&grant_type=authorization_code", { method: "POST" })
                    .then(response => response.json())
                    .then(data => {
                        console.log("this is access and refresh token");
                        console.log(data);
                        sessionStorage.setItem("google_access_token", data.access_token);
                        sessionStorage.setItem("google_refresh_token", data.refresh_token);

                    });

            } else {
                fetch("/api/Login/get?authCode=" + AuthorizationCode)
                    .then(response => response.json())
                    .then(data => {
                        sessionStorage.setItem("OAuthSession", JSON.stringify(data));
                        sessionStorage.setItem("box_access_token", data.access_token);
                        sessionStorage.setItem("box_refresh_token", data.refresh_token);
                    });
            }

        }
        if (sessionStorage.getItem("accessToken") == null) {

            return <div className="body">
                    <div className="header">
                        <p>Click to login to Google Drive </p>
                    </div>

                    <a className="logo-link" href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive&client_id=900082198060-kdvsjc3ecm82gn48dl9083cg0gihggm1.apps.googleusercontent.com&redirect_uri=https://localhost:44374/Login/&response_type=code&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&prompt=consent" >
                        <div className="logo" >
                            <section className="googledrive-logo" ></section>
                        </div>
                    </a>
                </div>;
        } else {
            return null;
        }
    }
}
