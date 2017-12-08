import * as React from 'react';
import { render } from 'react-dom';
import FileViewer from 'react-file-viewer';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

export interface AppProps {
    filename: string,
    downloadUrl: string,
    type: string
}

export interface AppState {

}

export class Preview extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super();

        this.state = {
            open: false
        }
    }

    getFileExtension(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    render() {
        return (
            <FileViewer
                fileType={this.getFileExtension(this.props.filename)}
                filePath={this.props.downloadUrl}
            />
        );
    }
}