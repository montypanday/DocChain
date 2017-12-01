﻿import * as React from 'react';
import { render } from 'react-dom';

export interface AppProps {
    filename: string,
    size: string,
    lastModified: string,
    downloadUrl: string
}

export interface AppState {

}

export class Row extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super();

        this.state = {

        }
    }

    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    getIconClass(extension)
    {
        switch (extension) {
            case 'txt':
                return "fa fa-file-text-o fa-2x";
            case 'docx':
                return "fa fa-file-word-o fa-2x";
            case 'zip':
                return "fa fa-file-archive-o fa-2x";
            case 'pptx':
                return "fa fa-file-powerpoint-o fa-2x";
            case 'm4a':
                return "fa fa-file-audio-o fa-2x";
            case 'png':
                return "fa fa-file-image-o fa-2x";
            case 'PNG':
                return "fa fa-file-image-o fa-2x";
            case 'pdf':
                return "fa fa-file-pdf-o fa-2x";
            case 'gif':
                return "fa fa-file-image-o fa-2x";
            case '':
                return "fa fa-folder fa-2x";
            default:
                return "fa fa-file fa-2x";
        }
    }

    render() {
        var a = this.getFileExtension(this.props.filename);
        var iconClass = this.getIconClass(a);
        return (
            <tr>
                <td className="col-md-6 "><i className={iconClass} style={{ verticalAlign: 'middle', float: 'left' }}></i><h5 style={{ float: 'left', paddingLeft: '15px' }}>{this.props.filename}</h5></td>
                <td className="col-md-1 ">
                    <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">...
                            </button>
                        <ul className="dropdown-menu">
                            <li><a href={this.props.downloadUrl} download>Download</a></li>
                            <li><a href="#" >Preview</a></li>
                            <li><a href="#">JavaScript</a></li>
                            <li className="divider"></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>
                </td>
                <td className="col-md-1">{this.props.size}</td>
                <td className="col-md-3">{this.props.lastModified}</td>
            </tr>
        );
    }
}