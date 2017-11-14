import * as React from 'react';
const img = require('../css/img/LoginBTN.png');

export class Tutorial1 extends React.Component<{}, {}> {
    public render() {
        return <div className="body">
            <div className="center-fade">
                <p className="welcome">Logging In</p>
            </div>
            <div className="pic-container">
                <section className="login-picture" style={{ backgroundImage: "url(" + img + ")" }}></section>
            </div>
            <div className="tutorial-container">
                <div className="tutorial-start">
                    <p>
                        Login to your cloud storage service by navigating to the login page here.
                    </p>
                </div>               
            </div>
            <a className="button prev" href="/Home/">Return</a>
            <a className="button next" href="/tutorial2/">Next</a>
        </div>;
    }
}