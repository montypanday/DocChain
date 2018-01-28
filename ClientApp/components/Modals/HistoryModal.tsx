import * as React from "react";
import { Modal, Button, FormGroup, FormControl } from "react-bootstrap";
import { MapHistory, GetFileHistory } from "../../api/Chain_Utilities";
import HistoryRecord from "./HistoryRecord";

export interface Props {

    fileID: string;
    fileName: string;
    fileHash: string;
    platform: string;
    closeHandler: any;
    //StatusCode: any;
}

export interface State {
    history: any
}

export default class HistoryModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
       
        this.state = {
            history: {}
        };
    }

    createRecord(row: object) {
        return (
            <HistoryRecord
                isValid={row["isValid"]}
                FileID={row["FileID"]}
                FileHash={row["FileHash"]}
                StoragePlatform={row["StoragePlatform"]}
                UserName={row["UserName"]}
                UserEmail={row["UserEmail"]}
                ActionTime={row["ActionTime"]}
                ActionType={row["ActionType"]}
                RowHash={row["RowHash"]}>
            </HistoryRecord>
        );
    }

    componentDidMount() {
        GetFileHistory(this.props.fileID, this.props.platform).then(data => {
            this.setState({ history: data });
        })
    }



    render() {
        console.log(this.props.fileID);
        console.log(this.state.history);
        console.log(typeof this.state.history);
        console.log(this.props.fileName);
        var rows;
        var isValid;
        var mismatchCount: number;
        var mismatchCountMessage;
        var historyDict;
        var statusMessage;

        if (this.state.history.length > 0) {
            historyDict = JSON.parse(this.state.history);
            rows = historyDict.map(function (row) {
                return (
                    <HistoryRecord
                        isValid={row["isValid"]}
                        FileID={row["FileID"]}
                        FileHash={row["FileHash"]}
                        StoragePlatform={row["StoragePlatform"]}
                        UserName={row["UserName"]}
                        UserEmail={row["UserEmail"]}
                        ActionTime={row["ActionTime"]}
                        ActionType={row["ActionType"]}
                        RowHash={row["RowHash"]}>
                    </HistoryRecord>
                );
            }.bind(this));

            if (this.props.fileHash == historyDict[0].FileHash) {
                isValid = true;
                statusMessage = <p className="alert alert-success"><b>SUCCESS:</b> This file is up to date with the most recent version embedded on the block-chain</p>;
            } else {
                isValid = false;
                statusMessage = <p className="alert alert-danger"><b>WARNING:</b> This file does not match the most recent version embedded on the block-chain</p>;
            }

            mismatchCount = 0;
            historyDict.forEach(r => {
                if (r.isValid == false) {
                    mismatchCount++;
                }
            });

            if (mismatchCount > 0) {
                mismatchCountMessage = <p className="alert alert-warning"><b>WARNING:</b> {mismatchCount} file-action records could not be matched with the block-chain</p>;
            } else {
                mismatchCountMessage = <p className="alert alert-info"><b>INFO:</b> The entire file history has correctly matched the blockchain</p>;
            }


            console.log(isValid);
            console.log("Mismatches: " + mismatchCount);

            return (
                <Modal show={true} bsSize="small" className="history-modal">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-lg">{this.props.fileName} History </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/*{this.props.StatusCode == 404 && <div className="alert alert-warning" role="alert"><strong>Not Found:</strong> Please Embed On Chain to keep track </div>}
                    {this.props.StatusCode == 200 && <div className="alert alert-success" role="alert"><strong>Match Found:</strong> Your file has not changed since the last time.</div>}*/}
                        {statusMessage}
                        {mismatchCountMessage}
                        <table>
                            <tbody>
                                <tr>
                                    <th className="timestamp-col">Timestamp</th>
                                    <th className="action-col">Action</th>
                                    <th className="username-col">User</th>
                                    <th className="email-col">E-Mail</th>
                                    <th className="filehash-col">File Hash</th>
                                </tr>
                                {rows}
                            </tbody>
                        </table>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.props.closeHandler} > Ok </Button>
                    </Modal.Footer>
                </Modal>
            );
        } else {
            return (
                <Modal show={true} bsSize="small" className="history-modal">
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-lg">{this.props.fileName} History </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="loading-div">Loading File History</div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.props.closeHandler} > Ok </Button>
                    </Modal.Footer>
                </Modal>
            );
        }
    }
}