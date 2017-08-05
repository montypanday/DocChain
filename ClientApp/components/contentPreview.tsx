import * as React from 'react';
import { render } from 'react-dom';
import { ContentPreview } from 'box-ui-elements';

const token = 'ACCESS_TOKEN';
const fileId = 'FILE_ID';

interface previewinterface { }

export class contentPreview extends React.Component<{}, previewinterface> {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }
    public render() {
        return (
            <div>
                <ContentPreview fileId={fileId} token={token} />,
    document.querySelector('.container')
                </div>)
    }
}
