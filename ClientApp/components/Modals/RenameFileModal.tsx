import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {FormGroup, FormControl}  from 'react-bootstrap';

export interface Props {
    RenameFileName: any,
    closeRenameModal: any
    //PreviewFileName: any,
    //PreviewUrl: any,
    //closeModal: any
}

export interface State {
}

export default class RenameFileModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <Modal show={true} bsSize="small" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Rename {this.props.RenameFileName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup>
                            <FormControl type="text" placeholder="Normal text" />
                        </FormGroup>
                        </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.closeRenameModal}>Rename </Button>
                    <Button> Cancel </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
