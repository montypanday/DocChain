import * as React from "react";
const s = require('../css/login.css');

interface LoginState {
    loggedIn: boolean
}

export class Login extends React.Component<{}, LoginState>
{
    constructor() {
        super();
        this.state = {
            loggedIn: false
        };
    }

   

    render() {
        if (location.search != "") {
            const search = location.search;
            const params = new URLSearchParams(search);
            const AuthorizationCode = params.get('code');

            fetch("/api/Login/get?authCode=" + AuthorizationCode)
                .then(response => response.text())
                .then(data => {
                    sessionStorage.setItem("accessToken", data);
                });
            
        }
        if (sessionStorage.getItem("accessToken") == null)
        {
            return <div className="body">          
                <div className="grid-container">
                    <div className="select">
                       <p> Select your cloud storage provider </p>
                    </div>
                    <div className="onedrive">
                        <section className="onedrive-logo"></section>
                        <p>OneDrive</p>
                    </div>
                    <div className="googledrive">
                        <section className="googledrive-logo"></section>
                        <p>Google Drive</p>
                    </div>
                    <div className="dropbox">
                        <section className="dropbox-logo"></section>
                        <p>Dropbox</p>
                    </div>
                    <a href="https://account.box.com/api/oauth2/authorize?response_type=code&client_id=3syx1zpgoraznjex526u78ozutwvgeby&state=security_token%3DKnhMJatFipTAnM0nHlZA">
                        <div className="box">
                            <section className="box-logo"></section>
                            <p>Box</p>
                        </div>
                    </a>
                </div>
            </div>;
        }
        else {
            return null;
        }
       
    }
}