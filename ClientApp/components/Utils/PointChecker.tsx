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

        const resultX = clickX - target.x - 22;
        const resultY = clickY - target.y + 7;

        console.log("click  : (" + clickX + ", " + clickY + ")");
        console.log("result top-left : (" + resultX + ", " + resultY + ")");
    }

    public render() {
        return <div className="pointchecker"></div>;
    }
}