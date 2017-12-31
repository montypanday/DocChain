import * as React from "react";
import { EmptySearchIcon } from '../SVGs/icon-EmptySearch';
require('./ErrorSplash.css');

export default class EmptySearch extends React.Component {

    public render() {
        return <div className="splash">
            <EmptySearchIcon />
            <p>Your search returned no results.</p>
        </div>
    }
}