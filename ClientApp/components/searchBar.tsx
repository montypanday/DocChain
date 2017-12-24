import * as React from 'react';
import { render } from 'react-dom';

export interface AppProps {
    searchhandler: any
}

export interface AppState {
}

export class SearchBar extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
        }
    }

    render() {
        console.log("SearchBar was rendered");
        return (
            <div className="col-lg-6" style={{ padding: '0px'}}>
                <div className="input-group">
                    <input type="text" className="form-control" onChange={this.props.searchhandler(this)} placeholder="Search for files and folders" />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.props.searchhandler(this)} > Search</button>
                    </span>
                </div>
            </div>
        );
    }
}
