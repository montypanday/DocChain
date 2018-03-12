import * as React from "react";
import { BOXIcon } from "../svg/icon-BOX";

interface LoginState {
    loggedIn: boolean;
}

export class BoxLogin extends React.Component<{}, LoginState> {
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

            fetch("/api/Login/get?authCode=" + AuthorizationCode)
                .then(response => response.json())
                .then(data => {
                    sessionStorage.setItem("OAuthSession", JSON.stringify(data));
                    sessionStorage.setItem("box_access_token", data.access_token);
                    sessionStorage.setItem("box_refresh_token", data.refresh_token);
                });
        }

        if (sessionStorage.getItem("accessToken") == null) {

            return <div className="login-zone login-box">
                <a className="logo-link" href="https://account.box.com/api/oauth2/authorize?response_type=code&client_id=3syx1zpgoraznjex526u78ozutwvgeby&state=security_token%3DKnhMJatFipTAnM0nHlZA">
                        <p>Click to login to Box.com</p>
                        <BOXIcon/>
                    </a>
                </div>;
        } else {
            return null;
        }
    }

}
