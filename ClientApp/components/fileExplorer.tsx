import * as React from 'react';
import { render } from 'react-dom';
import { ContentExplorer } from 'box-ui-elements';
import messages from 'box-ui-elements/lib/i18n/en-US';
import 'box-ui-elements/dist/explorer.css';

//const token = 'ACCESS_TOKEN';
const token = JSON.parse(sessionStorage.getItem("Session"));
console.log("token " + token);
const getLocalizedMessage = (id, replacements) =>
    messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);

interface fileinterface { }

export class fileExplorer extends React.Component<{}, fileinterface> {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }

    public render() {
        return (
            <div>
                <ContentExplorer token={token} getLocalizedMessage={getLocalizedMessage} /> 
            </div>)
    }
//,document.querySelector('.container')
    // this was present after the ContentExplorer tag above, (yes after /> was ,document.querySelector('.container'))
}