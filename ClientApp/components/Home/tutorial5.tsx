import * as React from "react";

interface Tutorial5Prop {
    handler: any;
    decHandler: any;
    finishHandler: any;
}
interface Tutorial5State {

}
export class Tutorial5 extends React.Component<Tutorial5Prop, Tutorial5State> {
    public render() {
        return <div className="body">
            <div className="pic-container">
                <section className="example-step4 pic-example"></section>
            </div>
            <div className="tutorial-container">
                <br />
                <br />
                <button className="button prev" onClick={this.props.decHandler}>Return</button>
                <button className="button next" onClick={this.props.finishHandler}>Finish</button>
            </div>
        </div>;
    }
}

//<div className="center-fade">
//    <p className="welcome">Matching with the Blockchain</p>
//</div>
//    <div className="pic-container">
//        <section className="example-step4 pic-example"></section>
//    </div>
//    <div className="tutorial-container">
//        <div className="tutorial-start">
//            <p>
//                Match your [placeholder] with the blockchain by navigating here.
//                     </p>
//        </div>
//        <button className="button prev" onClick={this.props.decHandler}>Return</button>
//        <button className="button next" onClick={this.props.finishHandler}>Finish</button>
//    </div>