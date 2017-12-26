import * as React from 'react';
import { render } from 'react-dom';
import { Alert , Button } from 'react-bootstrap';

export interface AlertCollectionProps {
    ReceivedCode:any
}

export interface AlertCollectionState {
    
}

export default class AlertCollection extends React.Component<AlertCollectionProps, AlertCollectionState> {
    constructor(props: AlertCollectionProps) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
          <Alert bsStyle="danger">
                    <h4>Oh snap! You got an error!</h4>
                </Alert>
            

            
        );
    }
}
