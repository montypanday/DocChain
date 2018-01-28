import * as React from "react";
import { GDIcon } from "../SVGs/icon-GD";

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
        return <div className="login-zone">
            <a className="logo-link" href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive&client_id=900082198060-kdvsjc3ecm82gn48dl9083cg0gihggm1.apps.googleusercontent.com&redirect_uri=https://docchain.azurewebsites.net/api/Google/Authenticate&response_type=code&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&prompt=consent" >
                <p>Click to login to Google Drive </p>
                <GDIcon />
            </a>
        </div>;
    }
}
