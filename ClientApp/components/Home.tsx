import * as React from "react";

interface HomeState {
    slideCount: number;
}
interface HomeProperties {

}
export class Home extends React.Component<HomeProperties, HomeState> {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);
        this.state = {
            slideCount: 1
        };
    }

    handler(e) {
        e.preventDefault();
        this.setState({
            slideCount: this.state.slideCount + 1
        });
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

        </div>;
    }
}

