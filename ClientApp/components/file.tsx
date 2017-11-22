import * as React from 'react';

export class File extends React.Component<{}, {}> {
    render() {

        //This needs to become dynamic. How to import JSON data, pass it to this, render it in file explorer and wrap it with the link to file??
        var data = [
            {
                "fileName": "James Angutest.docx",
                "size": "2KB",
                "lastMod": "22/11/17"
            },
            {
                "fileName": "reactistough.gif",
                "size": "36KB",
                "lastMod": "22/11/2017"
            }
        ];

        var rows = data.map(function (row) {
            return <tr>
                <td className="col-md-6 col-md-pull-1">{row.fileName}</td>
                <td className="col-md-1 col-md-pull-2">{row.size}</td>
                <td className="col-md-3 col-md-pull-3">{row.lastMod}</td>
            </tr>
        });

        return <table className="table table-striped table-hover table-responsive">
            <thead>
                <th className="col-md-6 col-md-pull-1">File</th>
                <th className="col-md-1 col-md-pull-2">Size</th>
                <th className="col-md-3 col-md-pull-3">Last modified</th>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>

    }
};