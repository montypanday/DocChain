﻿import * as React from 'react';
import { render } from 'react-dom';
import * as ReactDOM from "react-dom";

export interface AppProps {
    root: string
}

export interface AppState {
}


export class ContextMenu extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super();
    }


    state = {
        visible: false,
    }

    componentDidMount() {
        const root = document.getElementById(this.props.root);

        root.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
        const root = document.getElementById(this.props.root);

        root.removeEventListener('contextmenu', this._handleContextMenu);
        root.removeEventListener('click', this._handleClick);
        root.removeEventListener('scroll', this._handleScroll);
    }

    _handleContextMenu = (event) => {
        event.preventDefault();

        this.setState({ visible: true });

        //const root = document.getElementById(this.props.root);
        const contextMenu = document.getElementById("contextMenu");

        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const contextMenuW = contextMenu.offsetWidth;
        const contextMenuH = contextMenu.offsetHeight;

        const right = (screenW - clickX) > contextMenuW;
        const left = !right;
        const top = (screenH - clickY) > contextMenuH;
        const bottom = !top;

        if (right) {
            contextMenu.style.left = `${clickX + 5}px`;
        }

        if (left) {
            contextMenu.style.left = `${clickX - contextMenuW - 5}px`;
        }

        if (top) {
            contextMenu.style.top = `${clickY + 5}px`;
        }

        if (bottom) {
            contextMenu.style.top = `${clickY - contextMenuH - 5}px`;
        }

        //alert(contextMenu.style.left);
        //alert(clickX);

        //contextMenu.style.left = `${clickX + 5}px`;
        //contextMenu.style.top = `${clickY + 5}px`;

        //alert(contextMenu.style.top);

    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const root = document.getElementById(this.props.root);
        const wasOutside = !(event.target.contains === root);

        if (wasOutside && visible) this.setState({ visible: false, });
    };

    _handleScroll = () => {
        const { visible } = this.state;

        if (visible) this.setState({ visible: false, });
    };

    render() {
        const { visible } = this.state;

        return (visible || null) &&

        <div className="list-group contextMenu" id="contextMenu">
            <a href="#" className="list-group-item"><i className="fa fa-download" aria-hidden="true"></i>Download</a>
            <a href="#" className="list-group-item">Preview</a>
            <a href="#" className="list-group-item">JavaScript</a>
            <a href="#" className="list-group-item">Do Something</a>
            <a href="#" className="list-group-item">About Us</a>
        </div>
                
    };
}

