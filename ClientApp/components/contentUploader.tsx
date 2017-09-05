import * as React from 'react';
import { render } from 'react-dom';
import { ContentUploader } from 'box-ui-elements';
import messages from 'box-ui-elements/lib/i18n/en-US';
import 'box-ui-elements/dist/uploader.css';

const token = 'ACCESS_TOKEN';
const getLocalizedMessage = (id, replacements) =>
    messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);

interface uploaderinterface { }

export class contentUploader extends React.Component<{}, uploaderinterface> {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }


    public render() {
        return (
            <div>
                <ContentUploader token={token} getLocalizedMessage={getLocalizedMessage} />,document.querySelector('.container')
                </div>)

    }
}