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
                <td>{row.fileName}</td>
                <td>{row.size}</td>
                <td>{row.lastMod}</td>
            </tr>
        });

        return <table>
            <thead>
                <th>File</th>
                <th>Size</th>
                <th>Last modified</th>
            </thead>
            {rows}
        </table>

    }
};