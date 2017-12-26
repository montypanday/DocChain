import { ButtonToolbar } from 'react-bootstrap';
import * as React from 'react';
import { Button } from 'react-bootstrap';
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
                    <Button bsStyle="success" href="https://account.box.com/api/oauth2/authorize?response_type=code&client_id=3syx1zpgoraznjex526u78ozutwvgeby&state=security_token%3DKnhMJatFipTAnM0nHlZA"><i className="fa fa-sign-in" aria-hidden="true"></i>Login</Button>
                    {/* Indicates a dangerous or potentially negative action */}
                    <Button bsStyle="danger"><i className="fa fa-power-off" aria-hidden="true"></i>Logout</Button>
                </ButtonToolbar>
            </div>
        );
    }
}
