import * as React from "react";

export default class TableHeading extends React.Component<{}, {}> {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    shouldComponentUpdate(nextProps) {
        return false;
    }

    render() {
        return (
            <thead>
                <tr>
                    <th className="col-xs-6">File Name</th>
                    <th className="col-xs-1 action-head">Actions</th>
                    <th className="col-xs-1 secure-head">Status</th>
                    <th className="col-xs-1">Size </th>
                    <th className="col-xs-2">Last Modified</th>
                </tr>
            </thead>
        );
    }
}