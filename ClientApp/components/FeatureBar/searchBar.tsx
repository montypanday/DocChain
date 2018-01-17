import * as React from "react";
import { render } from "react-dom";

export interface AppProps {
    changeHandler: any;
    searchHandler: any;
}

export interface AppState {
}

export class SearchBar extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
        };
    }

    handleKeyPress = (event) => {
        if (event.key == "Enter") {
            console.log("Enter was pressed");
            this.props.searchHandler();
        }
    }

    shouldComponentUpdate(nextProps) {
        return false;
    }

    render() {
        console.log("SearchBar was rendered");
        return (
            <div className="srch-bar-container">
                <div className="input-group">
                    <input type="text" className="form-control srch-bar" onChange={this.props.changeHandler} onKeyPress={this.handleKeyPress} placeholder="Search for files and folders" />
                    <span className="input-group-btn">
                        <button className="btn btn-default btn-line" type="button" onClick={this.props.searchHandler} > Search</button>
                    </span>
                </div>
            </div>
        );
    }
}

