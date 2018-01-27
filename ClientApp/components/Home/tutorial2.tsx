import * as React from "react";
import { Guide } from "../Home/guide";
import { PointChecker } from "../utils/pointchecker";

interface Tutorial2Prop {
    handler: any;
    decHandler: any;
}
interface Tutorial2State {
    isRendered: any;
    nextGuide: string,
    thisGuide: string,
    index: number,
}

var position = {
    x: 0,
    y: 0,
}

export class Tutorial2 extends React.Component<Tutorial2Prop, Tutorial2State> {
    constructor(props: Tutorial2Prop) {
        super(props);

        this.state = {
            isRendered: false,
            nextGuide: "guide0",
            thisGuide: "",
            index: 0,
        };
    }

    componentDidMount() {
        if (!this.state.isRendered) {
            position.x = document.getElementById("target").offsetLeft;
            position.y = document.getElementById("target").offsetTop;
           //console.log("(" + position.x + ", " + position.y + ")");
            this.setState({ isRendered: true });
            this.render();
        } else {
            //console.log("rerender");
            document.getElementById("guide0").classList.remove("hidden");
        }

        document.addEventListener("click", this._showGuide);
        //document.addEventListener("click", this._handler);
    }

    _handler = () => {
        location.href = "/tutorial3";
    }

    _showGuide = (event) => {
        const thisGuide = this.state.thisGuide;
        const nextGuide = this.state.nextGuide;
        const index = this.state.index;

        if (nextGuide != "end") {
            if (thisGuide != "") {
                document.getElementById(thisGuide).classList.add("hidden");
            }
            document.getElementById(nextGuide).classList.remove("hidden");

            this.setState({ thisGuide: nextGuide });

            this.setState({ index: index + 1 });

            if (this.state.index <= 5) {
                this.setState({ nextGuide: "guide" + this.state.index });
            } else {
                this.setState({ nextGuide: "end" });
                document.addEventListener("click", this._handler);
            }

           //console.log(this.state.thisGuide);
           //console.log(this.state.nextGuide);


        } else {
           //console.log("end");
        }
        event.preventDefault();

    }

    _addGuides = () => {
        //console.log("add guides");
        const guide1 = <Guide key="0" id="guide0" direction="top-left" title="Click At Here" content="To turn back to the home page and tutorial page" position={this._getPosition(165, 72)} />;
        const guide2 = <Guide key="1" id="guide1" direction="top-left" title="Click At Here" content="To turn to Box" position={this._getPosition(237, 72)} />;
        const guide3 = <Guide key="2" id="guide2" direction="top-left" title="Click At Here" content="To turn to Google" position={this._getPosition(300, 72)} />;
        const guide4 = <Guide key="3" id="guide3" direction="top-left" title="Click At Here" content="To find a solution of your question" position={this._getPosition(381, 72)} />;
        const guide5 = <Guide key="4" id="guide4" direction="down-right" title="Click At Here" content="To review the tutorial" position={this._getPosition(295, 310)} />;
        const guide6 = <Guide key="5" id="guide5" direction="top-left" title="Now Click Account to Login" content="" position={this._getPosition(473, 72)} />;
        const container = <div>
            {guide1}
            {guide2}
            {guide3}
            {guide4}
            {guide5}
            {guide6}
        </div>;
        
        return container;
    }

    _getPosition = (x: number, y: number) => {
        return {
            x: position.x + x,
            y: position.y + y,
        }
    }

    public render() {
        const isRendered = this.state.isRendered;

        let guides = null;
        if (isRendered) guides = this._addGuides();

        return <div className="body">
            <div className="pic-container">
                <img className="example-step1 pic-example" id="target"></img>
            </div>
            <div className="guide-container" id="giudes">
                {guides}
            </div>
        </div>;
    }
}