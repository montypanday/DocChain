import * as React from "react";
import { render } from "react-dom";
import { ButtonToolbar } from "react-bootstrap";
import { Button, DropdownButton, MenuItem } from "react-bootstrap";

export interface ButtonToolbarProps {
    NewFolderHandler: any;
    uploadHandler: any;
}

export interface ButtonToolbarState {
}

export default class ButtonToolBar extends React.Component<ButtonToolbarProps, ButtonToolbarState> {
    constructor(props: ButtonToolbarProps) {
        super(props);

        this.state = {
        };
    }
    shouldComponentUpdate(nextProps) {
        return false;
    }

    render() {
        return (

            <ButtonToolbar>
                <div className="btn-group">
                    <button type="button" className="btn btn-default btn-line dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i style={{ paddingRight: "4px" }} className="fa fa-upload"></i>
                        Upload <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <a className="btn-file">
                                <i className="fa fa-arrow-circle-o-up dropDownIcon" aria-hidden="true"></i>Upload file <input id="uploadINPUT" multiple type="file" onChange={e => { this.props.uploadHandler(e.target.files); }} />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-default btn-line dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fa fa-plus dropDownIcon" aria-hidden="true"></i>New <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                        {/* // TODO: PATRICK: Add icon for dropdown options.
                         // For example New Folder option should show a fontawesome folder in left*/}
                        <li><a onClick={this.props.NewFolderHandler} > <i className="fa fa-folder-open-o dropDownIcon" aria-hidden="true"></i>New Folder</a></li>
                    </ul>
                </div>
                <Button bsStyle="danger"><i className="fa fa-power-off power-icon" aria-hidden="true"></i>Logout</Button>
            </ButtonToolbar>

        );
    }
}