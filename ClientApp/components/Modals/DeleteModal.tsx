
import * as React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export interface AppProps {
    id: any;
    fileName: any;
    type: any;
    deleteActionHandler: any;
    closeHandler: any;
}

export interface AppState {
    isLoading:any
}

export default class FilePreviewModal extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isLoading: false,
        };
    }
    handleClick() {
        this.setState({ isLoading: true });

        // This probably where you would have an `ajax` call
        this.props.deleteActionHandler();
        setTimeout(() => {
            // Completed of async action, set loading state back
            this.setState({ isLoading: false });
        }, 2000);
    }
    render() {
        let isLoading = this.state.isLoading;
        return (
            <Modal show={true}>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-lg">Delete {this.props.fileName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this item?
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" disabled={isLoading} autoFocus onClick={!isLoading ? this.handleClick : null}>
                        {isLoading ? "Loading..." : "Delete"}

                        </Button>
                    <Button onClick={this.props.closeHandler}>Cancel
                        </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
