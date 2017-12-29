import * as React from 'react';
import { render } from 'react-dom';
import { Alert, Button } from 'react-bootstrap';

const errorDict = [
    { ErrorCode: 404, ErrorStatus: "neutral", ErrorMSG: this.ErrorCode + ": Page not found" },
    { ErrorCode: 500, ErrorStatus: "danger", ErrorMSG: this.ErrorCode + ": Internal server error, exception uncertain" },
];


export interface AlertCollectionProps {
    ReceivedCode:any
}

export interface AlertCollectionState {
    
}

export default class AlertCollection extends React.Component<AlertCollectionProps, AlertCollectionState> {
    constructor(props: AlertCollectionProps) {
        super(props);

        this.state = {
            ErrorCode: null,
            ErrorStatus: "",
            ErrorMSG: "",
        }
    }
                //this.setState key={errorDict.ErrorCode}... set state depending on the "Recieved Code"?
    render() {
        return (
            <Alert bsStyle={this.state["ErrorStatus"]}>
                <h4>{this.state["ErrorMSG"]}</h4>
                </Alert>
            

            
        );
    }
}
