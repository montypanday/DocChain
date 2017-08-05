import * as React from 'react';
import { render } from 'react-dom';
import { ContentExplorer } from 'box-ui-elements';
import messages from 'box-ui-elements/lib/i18n/en-US';
import 'box-ui-elements/dist/explorer.css';


const token = 'ACCESS_TOKEN';
const getLocalizedMessage = (id, replacements) =>
    messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);

interface fileinterface { }

export class fileExplorer extends React.Component<{}, fileinterface> {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }

    public render() {
        return(
        <div>
            <ContentExplorer token={token} getLocalizedMessage={getLocalizedMessage} /> ,document.querySelector('.container')
            </div>)
    }
}