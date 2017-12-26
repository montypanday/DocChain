import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
require('./previewModal.css');

export interface AppProps {
    PreviewFileName: any,
    PreviewUrl: any,
    closeModal: any
}

export interface AppState {
}

export default class FilePreviewModal extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <Modal show={true} bsSize="large" className="preview-dialog">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.props.PreviewFileName}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="preview-body">
                    <embed src={this.props.PreviewUrl}></embed>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
