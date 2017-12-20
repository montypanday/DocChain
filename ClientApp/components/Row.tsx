import * as React from 'react';
import { render } from 'react-dom';
//import { Preview } from '../components/filePreview';


export interface AppProps {
    type: string,
    filename: string,
    size: string,
    lastModified: string,
    downloadUrl: string,
    //isOpen: boolean
    navHandler: any
    id: any
    mimeType: any,
    iconLink: any,

}

export interface AppState {

}

export class Row extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {

        }
    }

    //toggleModal() {
    //    this.setState({ isOpen: true });
    //}

    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    getIconClass(extension)
    {
        switch (extension) {

            /*DOCUMENT TYPES*/
            case 'txt':
                return "fa fa-file-text-o fa-2x";
            case 'doc':
                return "fa fa-file-word-o fa-2x";
            case 'docx':
                return "fa fa-file-word-o fa-2x";
            case 'gdoc':
                return "fa fa-file-word-o fa-2x";
            case 'pdf':
                return "fa fa-file-pdf-o fa-2x";

            /* SPREADSHEET TYPES */
            case 'xls':
                return "fa fa-file-excel-o fa-2x";
            case 'xlsx':
                return "fa fa-file-excel-o fa-2x";
            case 'gsheets':
                return "fa fa-file-excel-o fa-2x";

            /* PRESENTATION TYPES */
            case 'ppt':
                return "fa fa-file-powerpoint-o fa-2x";
            case 'pptx':
                return "fa fa-file-powerpoint-o fa-2x";
            case 'gslides':
                return "fa fa-file-powerpoint-o fa-2x";

            /* AUDIO TYPES */
            case 'm4a':
                return "fa fa-file-audio-o fa-2x";

            /* IMAGE TYPES */
            case 'png':
                return "fa fa-file-image-o fa-2x";
            case 'jpg':
                return "fa fa-file-image-o fa-2x";
            case 'gif':
                return "fa fa-file-image-o fa-2x";
            case 'PNG':
                return "fa fa-file-image-o fa-2x";
            case 'JPG':
                return "fa fa-file-image-o fa-2x";
            case 'cs':
                return "fa fa-file-code-o fa-2x";

            /* ARCHIVE TYPES */
            case 'zip':
                return "fa fa-file-archive-o fa-2x";

            /* DEFAULTS */
            case '':
                return "fa fa-folder fa-2x";
            default:
                return "fa fa-file fa-2x";
        }
    }

    doSomething(e) {
        console.log("something");

        var fileActionJson = {
            fileAction: {
                "FileID" : "11111111",
                "FileHash": "256bit hexadecimal number",
                "StoragePlatform": "Docchain Development",
                "UserID" : "22222222",
                "ActionType" : "Test Action"
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

    render() {
        var a = this.getFileExtension(this.props.filename);
        var iconClass = this.getIconClass(a);
        var icon;
        if (this.props.mimeType === "application/vnd.google-apps.spreadsheet" || this.props.mimeType === "application/vnd.google-apps.document" || this.props.mimeType === "application/vnd.google-apps.presentation" || this.props.mimeType === "application/vnd.google-apps.form"
            || this.props.mimeType == "application/vnd.google-apps.map" || this.props.mimeType == "application/vnd.google-apps.site") {

            icon = <span style={{ verticalAlign: 'middle', float: 'left', fontSize: '2em' }}><img src={this.props.iconLink} className="googleImage"></img></span>
        }
        else {
            icon = <span className={iconClass} style={{ verticalAlign: 'middle', float: 'left', fontSize: '2em' }}></span>;
        }

        return (
            <tr>
                <td className="col-xs-6 " >
                    <a onClick={this.props.navHandler} style={{ cursor: 'pointer' }}>
                        {icon}
                        <h5 style={{ float: 'left', paddingLeft: '15px' }}>{this.props.filename}</h5>
                    </a>
                </td>
                <td className="col-xs-1 ">
                    <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" style={{ verticalAlign: 'middle'}} type="button" data-toggle="dropdown">...
                            </button>
                        <ul className="dropdown-menu">
                            <li><a href={this.props.downloadUrl} download><i className="fa fa-download dropDownIcon" aria-hidden="true"></i>Download</a></li>
                            {this.props.type != 'folder' && <li><a onClick={this.props.navHandler} ><i className="fa fa-eye dropDownIcon" aria-hidden="true"></i>Preview</a></li>}
                            <li><a href="#"><i className="fa fa-trash-o dropDownIcon" aria-hidden="true"></i>Delete</a></li>
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
                    </div>
                </td>
                {this.props.type != 'folder' && <td className="col-xs-1 " style={{ verticalAlign: 'middle' }}><i className="fa fa-lock fa-2x"></i></td>}
                <td className="col-xs-1 " style={{ verticalAlign: 'middle'}}>{this.props.size}</td>
                <td className="col-xs-2 " style={{ verticalAlign: 'middle'}}>{this.props.lastModified}</td>
            </tr>
        );
    }
}
//<td><i className="fa fa-exclamation-triangle fa-2x"></i></td>