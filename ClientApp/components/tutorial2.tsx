import * as React from 'react';
const img = require('../css/img/ExplorerBTN.png');

export class Tutorial2 extends React.Component<{}, {}> {
    public render() {
        return <div className="body">
            <div className="center-fade">
                <p className="welcome">Managing your files</p>
            </div>
            <div className="pic-container">
                <section className="explorer-picture" style={{ backgroundImage: "url(" + img + ")" }}></section>
            </div>
            <div className="tutorial-container">
                <div className="tutorial-start">
                    <p>
                        Access and manage your files by navigating to the file explorer provided by your cloud storage option.
                     </p>
                </div>
                <a className="button prev" href="/tutorial1/">Return</a>
                <a className="button next" href="/tutorial3/">Next</a>
            </div>
        </div>;
    }
}