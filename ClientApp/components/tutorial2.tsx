import * as React from 'react';

interface Tutorial2Prop {
    handler: any
    decHandler: any
}
interface Tutorial2State {

}

export class Tutorial2 extends React.Component<Tutorial2Prop, Tutorial2State> {
    public render() {
        return <div className="body">
            <div className="center-fade">
                <p className="welcome">Logging In</p>
            </div>
            <div className="pic-container">
                <section className="login-picture"></section>
            </div>
            <div className="tutorial-container">
                <div className="tutorial-start">
                    <p>
                        Login to your cloud storage service by navigating to the login page here.
                    </p>
                </div>               
            </div>
            <button className="button prev" onClick={this.props.decHandler}> Return</button>
            <button className="button next" onClick={this.props.handler}>Next</button>
        </div>;
    }
}