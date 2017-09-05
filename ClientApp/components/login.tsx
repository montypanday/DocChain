import * as React from 'react';
interface LoginState {
    loggedIn: boolean
    accessToken: string
}

export class Login extends React.Component<{}, LoginState>
{
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            accessToken: ""
        };
    }

    render() {
        if (location.search != "") {
            const search = location.search;
            const params = new URLSearchParams(search);
            const AuthorizationCode = params.get('code');

            fetch('/api/Login/get?authCode=' + AuthorizationCode)
                .then(response => response.text())
                .then(data => {
                    sessionStorage.setItem('accessToken', data);

                });
        }
        if (sessionStorage.getItem('accessToken') == null)
        {
            return <div><p> here is my paragraph</p><h2></h2><a href="https://account.box.com/api/oauth2/authorize?response_type=code&client_id=3syx1zpgoraznjex526u78ozutwvgeby&state=security_token%3DKnhMJatFipTAnM0nHlZA">Box Login</a></div >;
        }
        else {
            return null;
        }
       
    }
}