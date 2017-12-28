import * as React from 'react';
import { render } from 'react-dom';
import { ButtonToolbar } from 'react-bootstrap';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
require('../Table/icon.css');

export interface ButtonToolbarProps {
    NewFolderHandler: any
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
                    <div className="btn-group">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            New <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a onClick={this.props.NewFolderHandler} > New Folder</a></li>
                        </ul>
                    </div>
                    <Button bsStyle="danger"><i className="fa fa-power-off" aria-hidden="true"></i>Logout</Button>
                </ButtonToolbar>
            </div>
        );
    }
}
