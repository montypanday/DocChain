import * as React from "react";
import { EmptyFolderIcon } from "../svg/icon-EmptyFolder";

export default class EmptyFolder extends React.Component {

    public render() {
      
        return (<div className="splash inTbody">
            <EmptyFolderIcon></EmptyFolderIcon>
            <p>This folder contains no files.</p>
        </div>);
    }
}