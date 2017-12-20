import * as React from "react";


interface Tutorial1Prop {
    handler: any;
}
interface Tutorial1State {

}
export class Tutorial1 extends React.Component<Tutorial1Prop, Tutorial1State> {

    constructor() {
        super();
        this.state = {
            loggedIn: false
        };
    }

    public render() {
        return <div className="body">
            <div className="center-fade">
                <p className="welcome">Welcome to DocChain</p>
                <div className="about">
                    <p>
                        LINCD is a blockchain platform-as-a-service designed for incorporating your documents from box.com, OneDrive, Google Drive and Dropbox into the blockchain using our API.
                    </p>
                    <p>
                        Login to your cloud storage service to start hashing your documents, or view our quick tutorial below.
                    </p>
                </div>
            </div>
            <div className="tutorial-container">
                <div className="tutorial-start">
                    <p>

                    </p>
                </div>
                <button className="button" onClick={this.props.handler}>Start Tutorial</button>
            </div>
        </div>;
    }
}