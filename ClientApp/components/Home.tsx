import * as React from 'react';
const s = require ('../css/home.css');

export class Home extends React.Component<{}, {}> {
    public render() {
        return <div className="body">
            <div className="center-fade">
                <p className="welcome">Welcome to LINCD</p>
                <div className="about">
                    <p>
                        LINCD is...
                    </p>
                </div>
            </div>
            <div className="tutorial-container">
                <div className="tutorial-start">
                    <p>

                    </p>
                </div>
                <a className="button" href="/Tutorial1/">Start Tutorial</a>
            </div>
        </div>;
    }
}
