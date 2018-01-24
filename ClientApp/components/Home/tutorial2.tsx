import * as React from "react";
import { Guide } from "../Home/guide";


interface Tutorial2Prop {
    handler: any;
    decHandler: any;
}
interface Tutorial2State {

}

export class Tutorial2 extends React.Component<Tutorial2Prop, Tutorial2State> {
    componentDidMount() {
        document.addEventListener("click", this._getPoint);
    }

    _getPoint = (event) => {
        event.preventDefault();
        //console.log(event.target.tagName);
        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        console.log("click :(" + clickX + ", " + clickY + ")");
        console.log("screen :(" + screenW + ", " + screenH + ")");
    }

    public render() {

        const position = {
            x:"1px",
            y: "2px",
        }
        return <div className="body" id="target">
            <div className="pic-container">
                <img className="example-step1 pic-example"></img>
            </div>
            <div className="tutorial-container">
                <br />
                <br />
                <button className="button prev" onClick={this.props.decHandler}> Return</button>
                <button className="button next" onClick={this.props.handler}>Next</button>
                <br />
                <Guide direction="left-down" title="aaa" content="asdas" position={position} />
            </div>
        </div>;
    }
}