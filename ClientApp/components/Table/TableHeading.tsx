import * as React from 'react';

export default class TableHeading extends React.Component<{}, {}> {
    constructor(props) {
        super(props);

        this.state = {
        }
    }
    shouldComponentUpdate(nextProps) {
        return false;
    }

    render() {
        console.log("TableHeading was rendered");
        return (
            <thead>
                <tr>
                    <th className="col-xs-6">File Name</th>
                    <th className="col-xs-1">Actions</th>
                    <th className="col-xs-1">Secure</th>
                    <th className="col-xs-1">Size </th>
                    <th className="col-xs-2">Last Modified</th>
                </tr>
            </thead>
        );
    }
}
