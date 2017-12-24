import * as React from "react";
import { render } from "react-dom";
import { ContentPicker } from "box-ui-elements";
import messages from "box-ui-elements/lib/i18n/en-US";
import "box-ui-elements/dist/picker.css";

const getLocalizedMessage = (id, replacements) =>
    messages[id].replace(/{\s*(\w+)\s*}/g, (match, key) => replacements[key]);


interface IPickerinterface { }

export class contentPicker extends React.Component<{}, IPickerinterface> {
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
                fetch("/api/Login/put?hash=" + btoa(response.sha1), { method: "POST" })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if (data.statusCode == 200) {
                            alert("The hash of this file has been entered previously");
                        }
                        if (data.statusCode == 201) {
                            alert("The hash of this file has been successfully embedded into Blockchain");
                        }
                    }
                    );
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
