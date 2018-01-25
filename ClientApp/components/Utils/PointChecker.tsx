import * as React from "react";

interface AppProps {

}

interface AppState {
}

var target = {
    x: null,
    y: null,
};

export class PointChecker extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        document.addEventListener("click", this._getPoint);
        target.x = document.getElementById("target").offsetLeft;
        target.y = document.getElementById("target").offsetTop;
        console.log("picture: (" + target.x + ", " + target.y + ")");
    }

    _getPoint = (event) => {
        event.preventDefault();
        const clickX = event.clientX;
        const clickY = event.clientY;

        const resultX = clickX - target.x;
        const resultY = clickY - target.y;

        console.log("click  : (" + clickX + ", " + clickY + ")");
        console.log("result top-left  : (" + (resultX + 30) + ", " + (resultY - 15) + ")");
        console.log("result top-right : (" + (resultX -30) + ", " + (resultY + 20) + ")");
        console.log("result down-right: (" + (resultX + 170) + ", " + (resultY + 115) + ")");
    }

    public render() {
        return <div className="pointchecker"></div>;
    }
}