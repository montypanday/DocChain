import * as React from "react";
import { Guide } from "../Home/guide";
import { PointChecker } from "../utils/pointchecker";

interface Tutorial4Prop {
    handler: any;
    decHandler: any;
}
interface Tutorial4State {
    isRendered: any;
    nextGuide: string,
    thisGuide: string,
    index: number,
}

var position = {
    x: 0,
    y: 0,
}

export class Tutorial4 extends React.Component<Tutorial4Prop, Tutorial4State> {
    constructor(props: Tutorial4Prop) {
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
        location.href = "/tutorial5";
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

            if (this.state.index < 6) {
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
        const guide1 = <Guide key="0" id="guide0" direction="top-right" title="Click At Here" content="you can search a certain file" position={this._getPosition(170, 135)} />;
        const guide2 = <Guide key="1" id="guide1" direction="top-right" title="Click At Here" content="To up load a local file" position={this._getPosition(505, 135)} />;
        const guide3 = <Guide key="2" id="guide2" direction="top-right" title="Click At Here" content="To create a new folder" position={this._getPosition(600, 135)} />;
        const guide4 = <Guide key="3" id="guide3" direction="down-left" title="Click At Here" content="And see the preview of the file" position={this._getPosition(120, 150)} />;
        const guide5 = <Guide key="4" id="guide4" direction="down-left" title="Click At Here" content="And you could delete, rename and download the file" position={this._getPosition(530, 150)} />;
        const guide6 = <Guide key="5" id="guide5" direction="top-left" title="Now Click At This Button" content="" position={this._getPosition(550, 300)} />;
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
            <PointChecker />
            <div className="pic-container">
                <img className="example-step3 pic-example" id="target"></img>
            </div>
            <div className="guide-container" id="giudes">
                {guides}
            </div>
        </div>;
    }
}