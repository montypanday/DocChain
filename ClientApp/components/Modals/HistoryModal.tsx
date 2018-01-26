import * as React from "react";
import { Modal, Button, FormGroup, FormControl } from "react-bootstrap";

export interface Props {
    closeHandler: any;
    StatusCode: any;
}

export interface State {
}

export default class HistoryModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
       

        this.state = {
        };
    }

    render() {
        return (
            <Modal show={true} bsSize="small" >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-lg">History </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.StatusCode == 404 && <div className="alert alert-warning" role="alert"><strong>Not Found:</strong> Please Embed On Chain to keep track </div>}
                     {this.props.StatusCode == 200 && <div className="alert alert-success" role="alert"><strong>Match Found:</strong> Your file has not changed since the last time.</div>}
                   
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.closeHandler} > Ok </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}