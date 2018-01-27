import * as React from "react";
import { Guide } from "../Home/guide";
import { PointChecker } from "../utils/pointchecker";

interface Tutorial5Prop {
    handler: any;
    decHandler: any;
}
interface Tutorial5State {
    isRendered: any;
    nextGuide: string,
    thisGuide: string,
    index: number,
}

var position = {
    x: 0,
    y: 0,
}

export class Tutorial5 extends React.Component<Tutorial5Prop, Tutorial5State> {
    constructor(props: Tutorial5Prop) {
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
        }

        document.addEventListener("click", this._showGuide);
        //document.addEventListener("click", this._handler);
    }

    _handler = () => {
        location.href = "../";
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

            if (this.state.index < 3) {
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
        const guide1 = <Guide key="0" id="guide0" direction="left-down" title="Click At Here" content="You can check you files’ security by blockchain" position={this._getPosition(308, 150)} />;
        const guide2 = <Guide key="1" id="guide1" direction="left-top" title="Click At Here" content="You can see where certificate data goes" position={this._getPosition(308, 230)} />;
        const guide3 = <Guide key="2" id="guide2" direction="top-right" title="Click At Here" content="To logout or switch to other box accounts" position={this._getPosition(700, 135)} />;
        const container = <div>
            {guide1}
            {guide2}
            {guide3}
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
                <img className="example-step4 pic-example" id="target"></img>
            </div>
            <div className="guide-container" id="giudes">
                {guides}
            </div>
        </div>;
    }
}