import * as React from "react";
import { EmptySearchIcon } from "../svg/icon-EmptySearch";

export class EmptySearch extends React.Component {

    public render() {
        return <div className="splash inTbody">
            <EmptySearchIcon />
            <p>Your search returned no results.</p>
        </div>;
    }
}