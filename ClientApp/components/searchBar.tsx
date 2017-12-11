﻿import * as React from 'react';
import { render } from 'react-dom';

export interface AppProps {
    searchhandler: any
}

export interface AppState {
}

export class SearchBar extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super();

        this.state = {
        }
    }

    render() {
        return (
            <div className="col-lg-6" style={{ padding: '0px'}}>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for files and folders" />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button" onClick={this.props.searchhandler(this)} > Search</button>
                    </span>
                </div>
            </div>
        );
    }
}
