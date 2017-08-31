import * as React from 'react';
import { UserService } from '../services/UserService';
import 'isomorphic-fetch';



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
    componentWillReceiveProps(nextprops) {
        
        if (location.search != "") {
            var userservice = new UserService();


            const search = location.search;
            const params = new URLSearchParams(search);
            const AuthorizationCode = params.get('code');

            //userservice.getAccessToken(AuthorizationCode).then(data => {

            //    window.sessionStorage.setItem('accesstoken', data);
            //}, err => {
            //    //on error
            //    console.log(err);
            //},
            //    () => {

            //        //finally
            //});

            fetch('/api/Login/get?authCode=' + AuthorizationCode)
                .then(response => response.text() as Promise<string>)
                .then(data => {
                    console.log(data);
                    this.setState({
                        accessToken: data, loggedIn: true
                    });
                });
        }
    }


    render() {

       

        return <div><p> here is my paragraph</p><h2></h2><a href="https://account.box.com/api/oauth2/authorize?response_type=code&client_id=3syx1zpgoraznjex526u78ozutwvgeby&state=security_token%3DKnhMJatFipTAnM0nHlZA">Box Login</a></div >;
    }


}