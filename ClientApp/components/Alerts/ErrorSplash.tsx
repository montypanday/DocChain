import * as React from "react";
import { NetError } from "../SVGs/icon-NetError";

export default class ErrorSplash extends React.Component {

    public render() {
        return <div className="splash">
            <NetError/>
            <p>An error has occured while trying to load.</p>
        </div>;
    }
}