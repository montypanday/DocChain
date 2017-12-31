import * as React from 'react';
import { render } from 'react-dom';
require('./Dropdown.css');
require('./fa-icons.css');


export interface AppProps {
    type: string,
    filename: string,
    size: string,
    lastModified: string,
    downloadUrl: string,
    navHandler: any
    id: any
    mimeType: any,
    iconLink: any,
    deleteHandler: any
}

export interface AppState {
}

export class Row extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
        }
    }

    getFileExtension(filename) {
        try {
            return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        }
        catch{
            return "";
        }
    }

    getIconClass(extension, mimeType) {

        const FormatDictinary = {
            "txt": "text-o",
            "doc": "word-o",
            "docs": "word-o",
            "docx": "word-o",
            "gdoc": "word-o",
            "pdf": "pdf-o",
            "xls": "excel-o",
            "xlsx": "excel-o",
            "gsheets": "excel-o",
            "ppt": "powerpoint-o",
            "pptx": "powerpoint-o",
            "gslides": "powerpoint-o",
            "m4a": "audio-o",
            "mp4": "audio-o",
            "mp3": "audio-o",
            "png": "image-o",
            "PNG": "image-o",
            "JPG": "image-o",
            "jpg": "image-o",
            "JPEG": "image-o",
            "jpeg": "image-o",
            "gif": "image-o",
            "GIF": "image-o",
            "cs": "code-o",
            "zip": "archive-o",
            "flv": "video-o"
        }

        const GoogleFormatDictionary = {
            "application/vnd.google-apps.spreadsheet": "fa fa-2x fa-file-excel-o",
            "application/vnd.google-apps.document": "fa fa-2x fa-file-word-o",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "fa fa-2x fa-file-word-o",
            "application/vnd.google-apps.presentation": "fa fa-2x fa-file-powerpoint-o",
            "application/vnd.google-apps.drawing": "fa fa-2x fa-picture-o",
            "application/vnd.google-apps.map": "fa fa-2x fa-map-marker",
            "application/vnd.google-apps.form": "fa fa-2x fa-wpforms",
            "application/vnd.google-apps.site": "fa fa-2x fa-html5",
            "image/jpeg": "fa fa-2x fa-file-picture-o"
        }

        if (FormatDictinary[extension]) {
            return "fa fa-2x fa-file-" + FormatDictinary[extension];
        }
        if (extension === "" && mimeType === "") {
            return "fa fa-folder fa-2x";
        }
        if (GoogleFormatDictionary[mimeType]) {
            return GoogleFormatDictionary[mimeType];
        }
        if (mimeType == "application/vnd.google-apps.folder") {
            return "fa fa-folder fa-2x";
        }
        return "fa fa-2x fa-file-o";
    }

    doSomething(e) {
        console.log("something");

        var fileActionJson = {
            fileAction: {
                "FileID": "11111111",
                "FileHash": "256bit hexadecimal number",
                "StoragePlatform": "Docchain Development",
                "UserID": "22222222",
                "ActionType": "Test Action"
            }
        }

        fetch('https://localhost:44374/api/FileAction/LogAction', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fileActionJson)
        })
    }

    shouldComponentUpdate(nextProps) {
        const a = this.props.type !== nextProps.type;
        const b = this.props.filename !== nextProps.filename;
        const c = this.props.size !== nextProps.size;
        const d = this.props.lastModified !== nextProps.lastModified;
        return (a || b || c || d);
    }

    render() {
        console.log("Row was renderered again");
        var a = this.getFileExtension(this.props.filename);
        var iconClass = this.getIconClass(a, this.props.mimeType);
        var icon;
        icon = <span className={iconClass} style={{ verticalAlign: 'middle', float: 'left', fontSize: '2em' }}></span>;
        return (
            <tr>
                <td className="col-xs-6 " >
                    <a onClick={this.props.navHandler} style={{ cursor: 'pointer' }}>
                        {icon}
                        <h5 style={{ float: 'left', paddingLeft: '15px' }}>{this.props.filename}</h5>
                    </a>
                </td>
                <td className="col-xs-1 ">
                    {this.props.id != "sharedWithMe" && <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" style={{ verticalAlign: 'middle' }} type="button" data-toggle="dropdown">...
                            </button>
                        <ul className="dropdown-menu">
                            <li><a href={this.props.downloadUrl} download><i className="fa fa-download dropDownIcon" aria-hidden="true"></i>Download</a></li>
                            {this.props.type != 'folder' && <li><a onClick={this.props.navHandler} ><i className="fa fa-eye dropDownIcon" aria-hidden="true"></i>Preview</a></li>}
                            {this.props.id != "sharedWithMe" && < li > <a onClick={this.props.deleteHandler}><i className="fa fa-trash-o dropDownIcon" aria-hidden="true"></i>Delete</a></li>}
                            <li><a href="#"><i className="fa fa-pencil-square-o dropDownIcon" aria-hidden="true"></i>Rename</a></li>
                            <li><a href="#"><i className="fa fa-share dropDownIcon" aria-hidden="true"></i>Share</a></li>

                            {this.props.type != 'folder' && <li className="divider"></li>}
                            {this.props.type != 'folder' && <li><a href="#"><i className="fa fa-database dropDownIcon" aria-hidden="true"></i>Get Document Trail</a></li>}
                            {this.props.type != 'folder' && <li><a href="#"><i className="fa fa-play dropDownIcon" aria-hidden="true"></i>Start Trail</a></li>}
                            {this.props.type != 'folder' && <li><a href="#"><i className="fa fa-stop dropDownIcon" aria-hidden="true"></i>Stop Trail</a></li>}
                            {this.props.type != 'folder' && <li><a href="#"><i className="fa fa-certificate dropDownIcon" aria-hidden="true"></i>Get DocChain Certificate</a></li>}
                            {this.props.type != 'folder' && <li><a href="#"><i className="fa fa-link dropDownIcon" aria-hidden="true"></i>Embed Document</a></li>}
                            {this.props.type != 'folder' && <li><a href="#"><i className="fa fa-calendar-check-o dropDownIcon" aria-hidden="true"></i>Check File</a></li>}
                        </ul>
                    </div>}
                </td>
                {this.props.type != 'folder' && <td className="col-xs-1 " style={{ verticalAlign: 'middle' }}><i className="fa fa-lock fa-2x"></i></td>}
                <td className="col-xs-1 " style={{ verticalAlign: 'middle' }}>{this.props.size}</td>
                <td className="col-xs-2 " style={{ verticalAlign: 'middle' }}>{this.props.lastModified}</td>
            </tr>
        );
    }
}
//<td><i className="fa fa-exclamation-triangle fa-2x"></i></td>