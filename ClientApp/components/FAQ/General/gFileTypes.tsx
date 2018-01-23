import * as React from "react";

export class FileTypes extends React.Component {

    public render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                        What file types have supported previews on <strong>DocChain</strong>?
                        </a>
                </h4>
            </div>
            <div id="collapseTwo" className="panel-collapse collapse">
                <div className="panel-body">
                    Various types of files including documents, video, images and audio. Some uncommon formats may not yet be supported.
                    </div>
            </div>
        </div>;
    }
}