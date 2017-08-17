import * as React from 'react';
import { UserService } from '../services/UserService';


interface LoginState {
    loggedIn: boolean
    authCode: string
}

export class Login extends React.Component<{}, LoginState>
{
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            authCode: ""
        };


        //fetch('/api/Login/Authenticate')
        //    .then(response => response.redirect() as Promise<Int32Array>)
        //    .then(data => {
        //        this.setState({  });
        //    });
    }

    // __resourceQuery.toString();




    render() {
        //console.log(location.search);
        console.log(location);
        const search = location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const AuthorizationCode = params.get('code'); // bar
        console.log(AuthorizationCode);

        if (location.search != "")
        {
            var userservice = new UserService();
            userservice.getAccessToken(AuthorizationCode).then(data => {
                //on success
                //this.products = data;
            }, err => {
                //on error
                console.log(err);
            },
                () => {
                    //finally
                });
        }
        return <div><p> here is my paragraph</p><h2></h2><a href="https://account.box.com/api/oauth2/authorize?response_type=code&client_id=3syx1zpgoraznjex526u78ozutwvgeby&state=security_token%3DKnhMJatFipTAnM0nHlZA">Box Login</a></div >;
    }


}