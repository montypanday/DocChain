import * as React from "react";
import { render } from "react-dom";
import { ContentExplorer } from "box-ui-elements";
import { BreadCrumb } from '../components/BreadCrumb';
import messages from "box-ui-elements/lib/i18n/en-US";
import "box-ui-elements/dist/explorer.css";
const getLocalizedMessage = (id, replacements) =>
    messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);

interface fileinterface { }
export class fileExplorer extends React.Component<{}, fileinterface> {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }
    handleClick() {
        console.log(`such knowledge`);
    }
    public render() {
        const token = sessionStorage.getItem("accessToken");
        return (<div><BreadCrumb address='File Explorer'/><ContentExplorer token={sessionStorage.getItem("box_access_token")} getLocalizedMessage={getLocalizedMessage} onChoose={this.handleClick} /></div>);
    }
//
    // this was present after the ContentExplorer tag above, (yes after /> was ,document.querySelector('.container'))
}