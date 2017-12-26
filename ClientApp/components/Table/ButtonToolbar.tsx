import * as React from 'react';
import { render } from 'react-dom';
import { ButtonToolbar } from 'react-bootstrap';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
require('../Table/icon.css');

export interface ButtonToolbarProps {
}

export interface ButtonToolbarState {
}

export default class ButtonToolBar extends React.Component<ButtonToolbarProps, ButtonToolbarState> {
    constructor(props: ButtonToolbarProps) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <ButtonToolbar>
                   
                    {/* Indicates a successful or positive action */}
                    
                    {/* Indicates a dangerous or potentially negative action */}
                    <Button bsStyle="danger"><i className="fa fa-power-off" aria-hidden="true"></i>Logout</Button>
                </ButtonToolbar>
            </div>
        );
    }
}
