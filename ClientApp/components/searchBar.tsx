import * as React from 'react';
import { render } from 'react-dom';

export interface AppProps {
    changeHandler: any,
    searchHandler: any
}

export interface AppState {
}

export class SearchBar extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
        }
    }

    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
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
            <div style={{ width: '100%', minHeight: '50px', backgroundColor: '#f5f5f5' }}>
                <div className="col-lg-6" style={{ padding: '0px' }}>
                    <div className="input-group">
                        <input type="text" className="form-control" onChange={this.props.changeHandler} onKeyPress={this.handleKeyPress} placeholder="Search for files and folders" />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.props.searchHandler} > Search</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

