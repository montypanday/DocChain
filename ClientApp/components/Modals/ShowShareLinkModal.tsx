import * as React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FormGroup, FormControl } from "react-bootstrap";

export interface Props {
    url: any;
    closeHandler: any;
}

export interface State {
}

export default class ShowShareLinkModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        //this.copy = this.copy.bind(this);
        //this.select = this.select.bind(this);

        this.state = {
        };
    }

    render() {
        return (
            <Modal show={true} bsSize="small" >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-lg">Share </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup>
                            <div className="input-group">
                                <FormControl id="input_share_link" className="input_type" type="text" placeholder="Normal text" autoFocus readOnly value={this.props.url} />

                            </div>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeHandler} > Cancel </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}