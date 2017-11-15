import * as React from 'react';
import { Tutorial1 } from './tutorial1';
import { Tutorial2 } from './tutorial2';
import { Tutorial3 } from './tutorial3';
const s = require('../css/home.css');

interface HomeState {
    slideCount: number
}
interface HomeProperties {

}
export class Home extends React.Component<HomeProperties, HomeState> {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this)
        this.decHandler = this.decHandler.bind(this)
        this.state = {
            slideCount: 1
        }
    }

    handler(e) {
        e.preventDefault()
        this.setState({
            slideCount: this.state.slideCount + 1
        })
    }
    decHandler(e) {
        e.preventDefault()
        this.setState({ slideCount: this.state.slideCount - 1 })
    }
    public render() {
        return <div className="body">
            {this.state.slideCount === 1 ? <Tutorial1 handler={this.handler} /> : null}
            {this.state.slideCount === 2 ? <Tutorial2 handler={this.handler} decHandler={this.decHandler} /> : null}
            {this.state.slideCount === 3 ? <Tutorial3 handler={this.handler} decHandler={this.decHandler} /> : null}

        </div>;
    }
}

