﻿// Link.react.js
import * as React from "react";

const STATUS = {
    HOVERED: "hovered",
    NORMAL: "normal",
};

interface LinkState {
    class: any;
}

interface LinkProps {
    page:any;
}
export default class Link extends React.Component<LinkProps,LinkState> {
    constructor(props) {
        super(props);

        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);

        this.state = {
            class: STATUS.NORMAL,
        };
    }

    _onMouseEnter() {
        this.setState({ class: STATUS.HOVERED });
    }

    _onMouseLeave() {
        this.setState({ class: STATUS.NORMAL });
    }

    render() {
        return (
            <a
                className={this.state.class}
                href={this.props.page || "#"}
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}
            >
                {this.props.children}
            </a>
        );
    }
}