import * as React from "react";
import { Tutorial1 } from "./tutorial1";
import { Tutorial2 } from "./tutorial2";
import { Tutorial3 } from "./tutorial3";
import { Tutorial4 } from "./tutorial4";
import { Tutorial5 } from "./tutorial5";
const s = require("../css/home.css");

//import ErrorSplash from '../components/Alerts/ErrorSplash';
//import EmptyFolder from '../components/Alerts/EmptyFolder';

interface HomeState {
    slideCount: number;
}
interface HomeProperties {

}
export class Home extends React.Component<HomeProperties, HomeState> {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);
        this.decHandler = this.decHandler.bind(this);
        this.finishHandler = this.finishHandler.bind(this);
        this.state = {
            slideCount: 1
        };
    }

    handler(e) {
        e.preventDefault();
        this.setState({
            slideCount: this.state.slideCount + 1
        });
    }
    decHandler(e) {
        e.preventDefault();
        this.setState({ slideCount: this.state.slideCount - 1 });
    }

    finishHandler(e) {
        e.preventDefault();
        this.setState({ slideCount: this.state.slideCount - 4 });
    }

    public render() {
        return <div className="body">

            {this.state.slideCount === 1 ? <Tutorial1 handler={this.handler} /> : null}
            {this.state.slideCount === 2 ? <Tutorial2 handler={this.handler} decHandler={this.decHandler} /> : null}
            {this.state.slideCount === 3 ? <Tutorial3 handler={this.handler} decHandler={this.decHandler} /> : null}
            {this.state.slideCount === 4 ? <Tutorial4 handler={this.handler} decHandler={this.decHandler} /> : null}
            {this.state.slideCount === 5 ? <Tutorial5 handler={this.handler} decHandler={this.decHandler} finishHandler={this.finishHandler} /> : null}
        </div>;
    }
}

