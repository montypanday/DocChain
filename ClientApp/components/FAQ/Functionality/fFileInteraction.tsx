import * as React from "react";

export class FileInteractions extends React.Component {

    public render() {
        return (<div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour">
                    What file interactions are supported?
                        </a></h4>
            </div>
            <div id="collapseFour" className="panel-collapse collapse">
                <div className="panel-body">
                    Basic functionality of each cloud-storage provider (ie. Google Drive) is replicated on <strong>DocChain</strong>. Renaming, deleting, your files and folders, navigating into folders, previewing your files and dowloading them are all supported. Creating new folders, uploading new files and sharing your folders and files with others is also supported.
                    <br /><br />
                    Currently live-editing files are not supported on <strong>DocChain</strong>.
                    <br /> <br />
                    Additionality, we are working to implement the ability to view the history of all interactions made with each file.
                </div>
            </div>
        </div>
        );
    }
}