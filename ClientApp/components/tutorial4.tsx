import * as React from 'react';

interface Tutorial4Prop {
    handler: any
    decHandler: any
}
interface Tutorial4State {

}

export class Tutorial4 extends React.Component<Tutorial4Prop, Tutorial4State> {
    public render() {
        return <div className="body">
            <div className="center-fade">
                <p className="welcome">Embedding into the Blockchain</p>
            </div>
            <div className="pic-container">
                <section className="embed-picture"></section>
            </div>
            <div className="tutorial-container">
                <div className="tutorial-start">
                    <p>
                        Embed your documents into the blockchain by navigating to 'Embed into Blockchain' section.
                     </p>
                </div>
                <button className="button prev" onClick={this.props.decHandler}>Return</button>
                <button className="button next" onClick={this.props.handler}>Next</button>
            </div>
        </div>;
    }
}