import * as React from 'react';
import { render } from 'react-dom';
//import { Preview } from '../components/filePreview';
//var Modal = ReactBootstrap.Modal;
import { Modal } from 'react-bootstrap';


export interface AppProps {
    filename: string,
    size: string,
    lastModified: string,
    downloadUrl: string,
    //isOpen: boolean
}

export interface AppState {

}

export class Row extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super();
        this.showPreviewOrNavigate = this.showPreviewOrNavigate.bind(this);
        this.state = {
            showModal: false
        }
    }

    //toggleModal() {
    //    this.setState({ isOpen: true });
    //}

    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    getIconClass(extension) {
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
            case 'jpg':
                return "fa fa-file-image-o fa-2x";
            case 'gif':
                return "fa fa-file-image-o fa-2x";
            case 'xlsx':
                return "fa fa-file-excel-o fa-2x";
            case '':
                return "fa fa-folder fa-2x";
            default:
                return "fa fa-file fa-2x";
        }
    }

    showPreviewOrNavigate() {
        console.log("showPreviewOrNavigate is clicked");
        this.setState({ showModal: true });
    }
    render() {
        var a = this.getFileExtension(this.props.filename);
        var iconClass = this.getIconClass(a);
        return (
            <tr>

                <td className="col-xs-6 "><span className={iconClass} style={{ verticalAlign: 'middle', float: 'left' }}></span><h5 onClick={this.showPreviewOrNavigate} style={{ float: 'left', paddingLeft: '15px' }}><div style={{ cursor: 'pointer' }}>{this.props.filename}</div></h5></td>
                <td className="col-xs-1 ">
                    <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" style={{ verticalAlign: 'middle' }} type="button" data-toggle="dropdown">...
                            </button>
                        <ul className="dropdown-menu">
                            <li><a href={this.props.downloadUrl} download><i className="fa fa-download" aria-hidden="true"></i>       Download</a></li>
                            <li><a href="#" >Preview</a></li>
                            <li><a href="#">JavaScript</a></li>
                            <li className="divider"></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>
                </td>
                <td className="col-xs-1 " style={{ verticalAlign: 'middle' }}><i className="fa fa-lock fa-2x"></i></td>
                <td className="col-xs-1 " style={{ verticalAlign: 'middle' }}>{this.props.size}</td>
                <td className="col-xs-2 " style={{ verticalAlign: 'middle' }}>{this.props.lastModified}</td>
            </tr>
        );
    }
}
//<td><i className="fa fa-exclamation-triangle fa-2x"></i></td>