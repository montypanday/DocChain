﻿import * as React from "react";
import { render } from "react-dom";
import * as ReactDOM from "react-dom";

export interface AppProps {
    root: string;
}

export interface AppState {
}

// TODO: ROY: Is this Context Menu used anywhere, make it to detect a right click event on a Row and see how to trigger event using a prop handler, like it is done in rename, delete etc.
export class ContextMenu extends React.Component<AppProps, AppState> {
    constructor(props) {
        super(props);
        const root = document.getElementById(this.props.root);
        this.state.root = root;
    }

    state = {
        id:"",
        visible: false,
        root: null,
        outOfRows: true,
    };

    componentDidMount() {
        this.state.root.addEventListener("contextmenu", this._handleContextMenu);
        document.addEventListener("click", this._handleClick);
        document.addEventListener("scroll", this._handleScroll);
    }

    componentWillUnmount() {
        this.state.root.removeEventListener("contextmenu", this._handleContextMenu);
        this.state.root.removeEventListener("click", this._handleClick);
        this.state.root.removeEventListener("scroll", this._handleScroll);
    }

    _handleContextMenu = (event) => {
        event.preventDefault();
        this.closeBtmMenu();

        //console.log(event.target.tagName);

        var contextMenu;
        this.getParentTrId(event.target);

        if (!this.state.outOfRows) {

            this.setState({ visible: true });

            contextMenu = document.getElementById("contextMenu" + this.state.id);
            contextMenu.classList.add("open");
            contextMenu.style.position = "fixed";
            contextMenu.style.zIndex = "1";

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
        }

        

    }

    getParentTrId = (node: Element) => {
        var parent = node.parentElement;
        var tagName = parent.tagName;

        if (tagName != "BODY") {
            if (tagName != "TR") {
                this.getParentTrId(parent);
            } else {
                this.state.id = parent.id;
                this.state.outOfRows = false;
                return parent.id;
            }
        } else {
            this.state.outOfRows = true;
        }
        
    }

    closeConetextMenu = () => {
        const menus = document.getElementsByClassName("contextmenu");
        for (var i = 0; i < menus.length; i++) {
            menus[i].classList.remove("open");
        }
    }

    closeBtmMenu = () => {
        const menus = document.getElementsByClassName("dropdown");
        for (var i = 0; i < menus.length; i++) {
            menus[i].classList.remove("open");
        }
    }

    _handleClick = (event) => {
        this.closeConetextMenu();
    }

    _handleScroll = () => {
        //const { visible } = this.state;

        //if (visible) { this.setState({ visible: false, }); }
        this.closeConetextMenu();
    }

    render() {
        const { visible } = this.state;

        return (visible || null) &&
            <div className = "dropdown open">
            </div>

            //<div className="list-group contextMenu" id="contextMenu">
            //    <a href="#" className="list-group-item"><i className="fa fa-download" aria-hidden="true"></i>Download</a>
            //    <a href="#" className="list-group-item">Preview</a>
            //    <a href="#" className="list-group-item">JavaScript</a>
            //    <a href="#" className="list-group-item">Do Something</a>
            //    <a href="#" className="list-group-item">About Us</a>
            //</div>;
    }
}