import * as React from 'react';
import { render } from 'react-dom';
import { ContentPicker } from 'box-ui-elements';
import messages from 'box-ui-elements/lib/i18n/en-US';
import 'box-ui-elements/dist/picker.css';



const getLocalizedMessage = (id, replacements) =>
    messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);

interface pickerinterface { }

export class contentPicker extends React.Component<{}, pickerinterface> {
    constructor() {
        super();
        this.state = { currentCount: 0 };
    }


    public render() {
        const token = sessionStorage.getItem('accessToken');
        return (
            <div>
                <ContentPicker token={sessionStorage.getItem('accessToken')} getLocalizedMessage={getLocalizedMessage} logoUrl='box' />
            </div>
        )
    }
}
