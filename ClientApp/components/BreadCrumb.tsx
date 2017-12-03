import * as React from 'react';
import { render } from 'react-dom';

export interface AppProps {
}

export interface AppState {
}

export class BreadCrumb extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super();

        this.state = {
        }
    }

    render() {
        return (
            <ol className="breadcrumb">
                <li><a href="#">All Files</a></li>
                <li><a href="#">Library</a></li>
                <li className="active">Data</li>
            </ol>
        );
    }
}
