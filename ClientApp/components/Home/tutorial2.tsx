import * as React from "react";
import { Guide } from "../Home/guide";
import { PointChecker } from "../utils/pointchecker";

interface Tutorial2Prop {
    handler: any;
    decHandler: any;
}
interface Tutorial2State {
    isRendered: any;
}

var position = {
    x: "0px",
    y: "0px",
}

export class Tutorial2 extends React.Component<Tutorial2Prop, Tutorial2State> {
    constructor(props: Tutorial2Prop) {
        super(props);

        this.state = {
            isRendered: false,
        };
    }

    componentDidMount() {
        if (!this.state.isRendered) {
            position.x = document.getElementById("target").offsetLeft + "px";
            position.y = document.getElementById("target").offsetTop + "px";
            console.log("(" + position.x + ", " + position.y + ")");
            this.setState({ isRendered: true })
            this.render();
        } else {
            console.log("rerender");
        }
    }

    _addGuides() {
        console.log("add guides");
        const guide1 = <Guide direction="left-down" title="aaa" content="asdas" position={position} />;
        return guide1;
    }

    public render() {
        const isRendered = this.state.isRendered;

        let guides = null;
        if (isRendered) guides = this._addGuides();

        return <div className="body">
            <PointChecker />
            <div className="pic-container">
                <img className="example-step1 pic-example" id="target"></img>
            </div>
            <div className="tutorial-container">
                <br />
                <br />
                <button className="button prev" onClick={this.props.decHandler}> Return</button>
                <button className="button next" onClick={this.props.handler}>Next</button>
                <br />
            </div>
            <div className="guide-container" id="giudes">
                {guides}
            </div>
        </div>;
    }
}