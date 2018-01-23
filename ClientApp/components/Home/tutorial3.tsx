import * as React from "react";

interface Tutorial3Prop {
    handler: any;
    decHandler: any;
}
interface Tutorial3State {

}

export class Tutorial3 extends React.Component<Tutorial3Prop, Tutorial3State> {
    public render() {
        return <div className="body">
            <div className="center-fade">
                <p className="welcome">Managing your files</p>
            </div>
            <div className="pic-container">
                <section className="explorer-picture"></section>
            </div>
            <div className="tutorial-container">
                <div className="tutorial-start">
                    <p>
                        Access and manage your files by navigating to the file explorer provided by your cloud storage option.
                     </p>
                </div>
                <button className="button prev" onClick={this.props.decHandler}>Return</button>
                <button className="button next" onClick={this.props.handler}>Next</button>
            </div>

        </div>;
    }
}