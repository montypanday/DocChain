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
            <div className="pic-container">
                <section className="example-step2 pic-example"></section>
            </div>
            <div className="tutorial-container">
                <br />
                <br />
                <button className="button prev" onClick={this.props.decHandler}>Return</button>
                <button className="button next" onClick={this.props.handler}>Next</button>
            </div>

        </div>;
    }
}