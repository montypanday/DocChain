import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

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
            <Modal show={true} bsSize="large" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">{this.props.PreviewFileName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <embed src={this.props.PreviewUrl}></embed>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
