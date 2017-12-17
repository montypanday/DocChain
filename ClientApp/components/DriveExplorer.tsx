import * as React from 'react';
import { render } from 'react-dom';
import { LoadingGif } from '../components/loadingGif';
import { SearchBar } from '../components/SearchBar';
import { Row } from '../components/Row';
import { Link, NavLink, Redirect } from "react-router-dom";
import { BreadCrumb } from '../components/breadCrumb';
require('../css/breadcrumb.css');
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ContextMenu } from '../components/ContextMenu';
require('../css/ContexMenu.css');

export class DriveExplorer extends React.Component<{}, {}> {

    constructor() {
        super();
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.formatSizeUnits = this.formatSizeUnits.bind(this);
        this.searchRoot = this.searchRoot.bind(this);
        this.navigate = this.navigate.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.navigateOut = this.navigateOut.bind(this);
        this.searchInFolder = this.searchInFolder.bind(this);
        this.state = {
            // This is space we will put the json response
            filesarray: {},

            // this is just true or false, determines whether the network request has finished, display a gif or a table
            loading: true,

            errorFound: false,

            errorMessage: "",

            //isOpen: false,

            PreviewUrl: "",

            PreviewFileName: "",

            query: "",

            showModal: false,

            pathCollection: [{ fileId: "root", Name: "All Files" }]

        }
    }

    searchRoot() {
        console.log("Searching in Root Folder");
        fetch("https://www.googleapis.com/drive/v3/files?q='root'+in+parents&trashed=false&fields=files", {
            method: "GET",
            headers:
            {
                'Authorization': 'Bearer ' + sessionStorage.getItem("google_access_token"),
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()  //we only get here if there is no error)
            })
            .then(data => {
                //console.log(data);
                var newData = [];
                for (var i = 0; i < data["files"].length; i++) {

                    var a = {};
                    if (data.files[i].mimeType == "application/vnd.google-apps.folder") {
                        //console.log(data.entries[i].type);
                        a = { type: "folder", id: data.files[i].id, fileName: data.files[i].name, size: this.formatSizeUnits(data.files[i].size), hash: "", lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "", downloadUrl: "" };
                    }
                    else {
                        a = { type: data.files[i].kind, id: data.files[i].id, fileName: data.files[i].name, size: this.formatSizeUnits(data.files[i].size), hash: data.files[i].md5Checksum, lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "https://docs.google.com/viewer?srcid=" + data.files[i].id + "&pid=explorer&efh=false&a=v&chrome=false&embedded=true", downloadUrl: data.files[i].webContentLink };
                    }
                    newData.push(a)
                }
                if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {
                    this.setState({ filesarray: newData, loading: false });
                    //console.log("different data was received this time.")
                }
            })
    }

    formatSizeUnits(bytes) {
        if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + ' GB'; }
        else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + ' MB'; }
        else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + ' KB'; }
        else if (bytes > 1) { bytes = bytes + ' bytes'; }
        else if (bytes == 1) { bytes = bytes + ' byte'; }
        else { bytes = ''; }
        return bytes;
    }

    componentDidMount() {
        console.log("Component Mounted -> Search Root Called");
        this.searchRoot();
    }

    handleSearchBarChange(e) {
        console.log("searching => " + e.target.value);
        this.setState({ query: e.target.value });
        if (this.state['query'] == "") {
            this.searchRoot();
        }
    }

    performSearch() {
        var querystring = this.state['query'];
        if (querystring == "") { this.searchRoot }
        else {
            fetch("https://www.googleapis.com/drive/v3/files?q=name+contains+'" + this.state['query'] + "'&trashed=false&fields=files(kind,id,name,md5Checksum,modifiedTime,webViewLink,webContentLink,size)", {
                method: "GET",
                headers:
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("google_access_token"),
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) { throw response }
                    return response.json()  //we only get here if there is no error)
                })
                .then(data => {
                    //console.log(data);
                    var newData = [];
                    for (var i = 0; i < data["files"].length; i++) {

                        var a = {};
                        if (data.files[i].kind == "drive#file") {
                            //console.log(data.entries[i].type);
                            a = {
                                type: data.files[i].kind, id: data.files[i].id, fileName: data.files[i].name, size: this.formatSizeUnits(data.files[i].size), hash: data.files[i].md5Checksum, lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "https://docs.google.com/viewer?srcid=" + data.files[i].id + "&pid=explorer&efh=false&a=v&chrome=false&embedded=true", downloadUrl: data.files[i].webContentLink
                            }
                        }
                        else {
                            a = { type: data.files[i].kind, id: data.files[i].id, fileName: data.files[i].name, size: this.formatSizeUnits(data.files[i].size), hash: "", lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "", downloadUrl: "" }
                        }
                        newData.push(a)
                    }
                    if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {
                        this.setState({ filesarray: newData, loading: false });
                        //console.log("different data was received this time.")
                    }
                })
        }
    }
    //"https://docs.google.com/viewer?url="+
    navigate(row, event) {
        // this is to navigate into folders
        var res = row.embedLink.toString();
        var str = res.replace("view", "preview");
        console.log(row);
        if (row.type === "folder") {
            console.log("Navigated into folder ->" + row);
            var newArray = this.state['pathCollection'];
            newArray.push({ fileId: row.id, Name: row.fileName });
            this.setState({ pathCollection: newArray });
            this.searchInFolder(row.id);
        }
        if (row.type === "drive#file") {
            this.setState({ PreviewUrl: row.embedLink, PreviewFileName: row.fileName, showModal: true })
        }
    }

    navigateOut(fileid, name) {
        console.log("fileid -> " + fileid + " " + name);
        var coll = this.state['pathCollection'];
        console.log(this.state['pathCollection']);
        console.log(coll);
        var index;
        for (var i = 0; i < coll.length; i++)
        {
            console.log(coll[i].fileId);
            if (coll[i].fileId == fileid) {
                index = i;
            }
        }
        console.log("this is old Coll " + coll);
        coll.length = index + 1;
        console.log("this is coll ->" + coll);
        this.setState({ pathCollection: coll });

        this.searchInFolder(fileid);
    }

    searchInFolder(fileID) {
        console.log("Searching in folder -> " + fileID);
        fetch("https://www.googleapis.com/drive/v3/files?q='"+fileID+"'+in+parents&trashed=false&fields=files", {
            method: "GET",
            headers:
            {
                'Authorization': 'Bearer ' + sessionStorage.getItem("google_access_token"),
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()  //we only get here if there is no error)
            })
            .then(data => {
                //console.log(data);
                var newData = [];
                for (var i = 0; i < data["files"].length; i++) {

                    var a = {};
                    if (data.files[i].mimeType == "application/vnd.google-apps.folder") {
                        //console.log(data.entries[i].type);
                        a = { type: "folder", id: data.files[i].id, fileName: data.files[i].name, size: this.formatSizeUnits(data.files[i].size), hash: "", lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "", downloadUrl: "" };
                    }
                    else {
                        a = { type: data.files[i].kind, id: data.files[i].id, fileName: data.files[i].name, size: this.formatSizeUnits(data.files[i].size), hash: data.files[i].md5Checksum, lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "https://docs.google.com/viewer?srcid=" + data.files[i].id + "&pid=explorer&efh=false&a=v&chrome=false&embedded=true", downloadUrl: data.files[i].webContentLink };
                    }
                    newData.push(a)
                }
                if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {

                    this.setState({ filesarray: newData, loading: false });
                    //console.log("different data was received this time.")
                }
            })
    }

    closeModal() {
        this.setState({ PreviewUrl: "", showModal: false, PreviewFileName: "" })
    }

    showPreview() {
        this.setState({ showingPreview: true });
    }

    getUser() {
        console.log("I'm here");
        fetch("https://www.googleapis.com/auth/plus.me", {
            method: "GET",
            headers:
            {
                'Authorization': 'Bearer ' + sessionStorage.getItem("google_access_token"),
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) { throw response }
                console.log(response.json()['id'])
                return response.json()  //we only get here if there is no error)
            })
            .then(data => {
                console.log(data["id"]);
            })
    }

    public render() {

        if (sessionStorage.getItem("google_access_token") == null) {
            sessionStorage.getItem("")
            return <Redirect to='/driveLogin' />

        } else if (this.state['loading'] === false) {
            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return (<Row key={row.ID} id={row.ID} navHandler={this.navigate.bind(null, row)} filename={row.fileName} size={row.size} lastModified={row.lastModified} downloadUrl={row.downloadUrl}></Row>);
            }.bind(this));

            var pathElements = this.state['pathCollection'].map(function (row) {
                console.log(row);
                return (<a key={row.fileID} onClick={() =>this.navigateOut(row.fileId,row.Name)}>{row.Name}</a>);
            }.bind(this));

            return (
                <div className="well well-lg pull-down">
                    <div style={{ width: '100%', minHeight: '50px', backgroundColor: '#f5f5f5' }}>
                        <div className="col-lg-6" style={{ padding: '0px' }}>
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={this.handleSearchBarChange} onKeyDown={this.performSearch} onKeyUp={this.performSearch} placeholder="Search for files and folders" />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={this.performSearch}> Search</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="breadcrumb flat">
                        {pathElements}
                    </div>
                    <ContextMenu root="rows" />
                    <table className="table table-striped table-hover table-responsive well header-fixed">
                        <thead>
                            <tr>
                                <th className="col-xs-6">File Name</th>
                                <th className="col-xs-1">More</th>
                                <th className="col-xs-1">Secure</th>
                                <th className="col-xs-1">Size </th>
                                <th className="col-xs-2">Last Modified</th>
                            </tr>
                        </thead>
                        <tbody id="rows">
                            {rows}
                        </tbody>
                    </table>
                    <Modal show={this.state["showModal"]} bsSize="large" >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">{this.state['PreviewFileName']}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <embed src={this.state["PreviewUrl"]}></embed>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closeModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        } else
            // determine if that loading is finished and render accordinglyf
            return (
                <div className="loadingGif">
                    <LoadingGif />
                    <p>Loading...</p>
                </div>
            );
    }
}