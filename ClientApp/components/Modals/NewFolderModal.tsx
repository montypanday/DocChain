
import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

export interface NewFolderModalProps {
    createFolderHandler: any,
    closeHandler: any
}

export interface NewFolderModalState {
}

export default class NewFolderModal extends React.Component<NewFolderModalProps, NewFolderModalState> {
    constructor(props: NewFolderModalProps) {
        super(props);
        this.validateNDCreate = this.validateNDCreate.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            InputValue: "",
            errorFound: false,
            isLoading: false,
        }
    }

    validateNDCreate() {
        this.setState({ isLoading: true });
        var patt = new RegExp("^[^.]+$");
        if (patt.test(this.state["InputValue"])) {
            console.log("Test Passed");
            this.props.createFolderHandler(this.state["InputValue"]);
            setTimeout(() => {
                // Completed of async action, set loading state back
                this.setState({ isLoading: false });
            }, 2000);
        }
        else {
            console.log("error was found");
            this.setState({ errorFound: true });
        }

    }
    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            console.log("Enter was pressed");
            this.setState({ isLoading: true });
            this.validateNDCreate();
            setTimeout(() => {
                // Completed of async action, set loading state back
                this.setState({ isLoading: false });
            }, 2000);

        }
    }

    render() {
        let isLoading = this.state["isLoading"];
        return (
            <Modal show={true} bsSize="small" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Create New Folder </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                        <FormGroup>
                            <div className="input-group">
                                <FormControl onChange={e => { this.setState({ InputValue: e.target.value }) }} onKeyPress={this.handleKeyPress.bind(this)} type="text" autoFocus placeholder="Folder Name" />
                            </div>
                        </FormGroup>
                        {this.state["errorFound"] && <Alert bsStyle="warning" > <strong>Bad Name </strong>It cannot be empty and not have an extension</Alert>}
                  
                </Modal.Body>
                <Modal.Footer>
                    <Button id="submission" disabled={isLoading} onClick={!isLoading ? this.validateNDCreate : null} bsStyle="primary" > 
                        {isLoading ? 'Loading...' : 'Create'}
                        </Button>
                    <Button  onClick={this.props.closeHandler} > 
                        Cancel
                        </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}