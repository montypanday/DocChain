import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

export interface Props {
    newFileNameHandler: any,
    closeRenameModal: any,
    oldFileName: ""
    //PreviewFileName: any,
    //PreviewUrl: any,
    //closeModal: any
}

export interface State {
}

export default class RenameFileModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.validate = this.validate.bind(this);

        this.state = {
            newName: "",
            isLoading: false,
            ErrorFound: false
        }
    }

    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            console.log("Enter was pressed");
            this.setState({ isLoading: true });
            if (this.validate()) {
                this.setState({ ErrorFound: false });
                this.props.newFileNameHandler(this.state["newName"]);
            }
            setTimeout(() => {
                // Completed of async action, set loading state back
                this.setState({ isLoading: false });
            }, 2000);

        }
    }

    errorFound() {
        this.setState({ ErrorFound: true });
    }

    validate() {
        let OldFileName = this.props.oldFileName;
        let NewFileName = this.state["newName"];
        var ext = OldFileName.substr(OldFileName.lastIndexOf('.') + 1);
        var Newext = NewFileName.substr(NewFileName.lastIndexOf('.') + 1);
        if ((OldFileName.split(".").length - 1) == 0 && (NewFileName.split(".").length - 1) == 0) {
            return true;
        }
        if (NewFileName.split(".").length - 1 > 1) {
            this.errorFound();
            return false;
        }
        if (ext != Newext) {
            this.errorFound();
            return false;
        }
        return true;
    }

    submitNewName = (event) => {
        if (this.validate()) {
            this.setState({ ErrorFound: false });
            this.props.newFileNameHandler(this.state["newName"]);
        }
    }

    render() {
        let isLoading = this.state["isLoading"];
        return (
            <Modal show={true} bsSize="small" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Rename {this.props.oldFileName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <FormControl onChange={e => { this.setState({ newName: e.target.value }) }} onKeyPress={this.handleKeyPress.bind(this)} autoFocus type="text" placeholder="New name" />
                    </FormGroup>
                    {this.state["ErrorFound"] && <Alert bsStyle="warning" > <strong>Invalid Name: </strong> should have same extension! </Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.submitNewName.bind(this)} >
                        {isLoading ? 'Loading...' : 'Create'}
                    </Button>
                    <Button onClick={this.props.closeRenameModal} > Cancel </Button>
                </Modal.Footer>
            </Modal >
        );
    }
}
