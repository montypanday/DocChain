import * as React from "react";

interface Tutorial4Prop {
    handler: any;
    decHandler: any;
}
interface Tutorial4State {

}

export class Tutorial4 extends React.Component<Tutorial4Prop, Tutorial4State> {
    public render() {
        return <div className="body">
            <div className="pic-container">
                <section className="example-step3 pic-example"></section>
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