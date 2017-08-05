import * as React from 'react';
import { render } from 'react-dom';
import { ContentTree } from 'box-ui-elements';
import messages from 'box-ui-elements/lib/i18n/en-US';
import 'box-ui-elements/dist/tree.css';

const token = 'ACCESS_TOKEN';
const getLocalizedMessage = (id, replacements) =>
    messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);

interface treeinterface { }

export class contentTree extends React.Component<{}, treeinterface> {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }
    public render() {
        return (
            <div>
                <ContentTree token={token}getLocalizedMessage={getLocalizedMessage}/>,document.querySelector('.container')
            </div>)
    }
}
