import * as React from "react";

export interface Props {

    isValid: boolean;
    FileID: string;
    FileHash: string;
    StoragePlatform: string;
    UserName: string;
    UserEmail: string;
    ActionTime: string;
    ActionType: string;
    RowHash: string;
}

export interface State {

}

export default class HistoryRecord extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);


        this.state = {
        };
    }

    render() {

        var rowClass;
        if (this.props.isValid) {
            rowClass = "alert alert-success";
        } else {
            rowClass = "alert alert-danger";
        }

        return (

            <tr className={rowClass}>
                <td className="timestamp-col">  {this.props.ActionTime} </td>
                <td className="action-col">     {this.props.ActionType} </td>
                <td className="username-col">   {this.props.UserName}   </td>
                <td className="email-col">      {this.props.UserEmail}  </td>
                <td className="filehash-col">   {this.props.FileHash}   </td>
            </tr>
        );
    }
}