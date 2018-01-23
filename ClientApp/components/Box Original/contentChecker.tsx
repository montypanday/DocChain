import * as React from "react";
import { render } from "react-dom";
import { ContentPicker } from "box-ui-elements";
import messages from "box-ui-elements/lib/i18n/en-US";
import "box-ui-elements/dist/picker.css";

const getLocalizedMessage = (id, replacements) =>
    messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);


interface IPickerinterface { }

export class contentChecker extends React.Component<{}, IPickerinterface> {
    constructor(props) {
        super(props);
    }

    // This function is called when onChoose event occurs on ContentPicker component.
    fileChosen(e) {

        // This fetch is made to box api
        // e is an array of an array.
        //e[0] is the object which has id field which is effectively file id
        fetch("https://api.box.com/2.0/files/" + e[0].id, {
            method: "PUT", mode: "cors",
            headers: {

                // Access token is taken from session storage.
                "Accept": "application / json",
                "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
            },

        }).then(response => response.json())
            .then(response => {
                //response is the file object captured.
                //It has all file information like file id, sha1
                fetch("/api/Login/check?hash=" + btoa(response.sha1), { method: "PUT" })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.statusCode == 200) {
                            alert("The hash of this file exists in Blockchain. Therefore, file has not changed!");
                        }
                        if (data.statusCode == 404) {
                            alert("The hash of this file was not found in the Blockchain. Be careful, either the file has changed or you forgot to put its hash into Blockchain");
                        }

                    });
            });
    }
    render() {

        const fileobject = null;
        return (
            <div>
                <ContentPicker token={sessionStorage.getItem("accessToken")} getLocalizedMessage={getLocalizedMessage} logoUrl="box" maxSelectable={1} onChoose={(e) => this.fileChosen(e)} />
            </div>
        );
    }
}
