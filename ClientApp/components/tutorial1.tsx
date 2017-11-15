import * as React from 'react';

interface Tutorial1Prop {
    handler: any
}
interface Tutorial1State {

}
export class Tutorial1 extends React.Component<Tutorial1Prop, Tutorial1State> {

    public render() {
        return <div className="body">
            <div className="center-fade">
                <p className="welcome">Welcome to LINCD</p>
                <div className="about">
                    <p>
                        LINCD is...
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