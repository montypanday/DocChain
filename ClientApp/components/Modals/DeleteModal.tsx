import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export interface AppProps {
    //DeleteFileName: any,
    //deleteHandler: any,
    //closeDeleteModal: any
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
            <Modal show={true}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Delete</Modal.Title>
                </Modal.Header>

                <Modal.Footer>
                    <Button bsStyle="primary" /*onClick={this.props.closeDeleteModal}*/>Delete</Button>
                    <Button>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
