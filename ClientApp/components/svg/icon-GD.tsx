import * as React from "react";

export class GDIcon extends React.Component {

    public render() {
        return <div className="icon GDIcon">
            <svg viewBox="0 0 48 48" version="1.1" width="1.5em" height="1.5em">
            <path fill="#FFC107" d="M 17 6 L 31 6 L 45 30 L 31 30 Z " />
            <path fill="#1976D2" d="M 9.875 42 L 16.9375 30 L 45 30 L 38 42 Z " />
            <path fill="#4CAF50" d="M 3 30.125 L 9.875 42 L 24 18 L 17 6 Z " />
            </svg>
        </div>;
    }
}