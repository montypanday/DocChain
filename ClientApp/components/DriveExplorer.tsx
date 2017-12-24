import * as React from 'react';
import { render } from 'react-dom';
import { LoadingGif } from '../components/loadingGif';
import { SearchBar } from '../components/SearchBar';
import { Row } from '../components/Table/Row';
import { Link, NavLink, Redirect } from "react-router-dom";
import { BreadCrumb } from '../components/breadCrumb';
require('../css/breadcrumb.css');
//import { Modal } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';
import { ContextMenu } from '../components/ContextMenu';
require('../css/ContexMenu.css');
import { formatSizeUnits } from '../api/Helpers/FormatSize';
import FilePreviewModal from '../components/Modals/FilePreviewModal';
import TableHeading from '../components/Table/TableHeading';
import { GRoot } from '../api/Google/GRoot';
import { GSearch } from '../api/Google/GSearch';

export class DriveExplorer extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
        this.performSearch = this.performSearch.bind(this);
        this.searchRoot = this.searchRoot.bind(this);
        this.navigate = this.navigate.bind(this);
        this.closePreviewModal = this.closePreviewModal.bind(this);
        this.navigateOut = this.navigateOut.bind(this);
        this.searchInFolder = this.searchInFolder.bind(this);
        this.state = {
            // This is space we will put the json response
            filesarray: {},
            // this is just true or false, determines whether the network request has finished, display a gif or a table
            loading: true,
            errorFound: false,
            errorMessage: "",
            PreviewUrl: "",
            PreviewFileName: "",
            query: "",
            showPreviewModal: false,
            pathCollection: [{ fileId: "root", Name: "All Files" }]
        }
    }

    searchRoot() {
        console.log("Searching in Root Folder");
        GRoot().then(newData => {
            if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {
                this.setState({ filesarray: newData, loading: false });
            }
        });
    }

    componentDidMount() {
        console.log("Component Mounted -> Search Root Called");
        this.searchRoot();
    }

    performSearch(e) {

        console.log(e.charCode);
        if (e.charCode == 13) {
            var querystring = this.state["query"];
            console.log("queryString -> " + querystring);
            if (querystring == "") { this.searchRoot }
            else {
                GSearch(this.state['query']).then(newData => {
                    if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {
                        this.setState({ filesarray: newData, loading: false });
                    }
                });
            }
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
            this.setState({ PreviewUrl: row.embedLink, PreviewFileName: row.fileName, showPreviewModal: true })
        }
    }

    navigateOut(e) {
        var coll = this.state['pathCollection'];
        var index;
        for (var i = 0; i < coll.length; i++) {
            if (coll[i].fileId == e.fileId) {
                index = i;
            }
        }
        coll.length = index + 1;
        this.setState({ pathCollection: coll });
        this.searchInFolder(e.fileId);
    }

    searchInFolder(fileID) {
        console.log("Searching in folder -> " + fileID);
        fetch("https://www.googleapis.com/drive/v3/files?q='" + fileID + "'+in+parents&trashed=false&fields=files", {
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
                        a = { type: "folder", id: data.files[i].id, fileName: data.files[i].name, size: formatSizeUnits(data.files[i].size), hash: "", lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "", downloadUrl: "", mimeType: data.files[i].mimeType, iconLink: data.files[i].iconLink };
                    }
                    else {
                        a = { type: data.files[i].kind, id: data.files[i].id, fileName: data.files[i].name, size: formatSizeUnits(data.files[i].size), hash: data.files[i].md5Checksum, lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: "https://docs.google.com/viewer?srcid=" + data.files[i].id + "&pid=explorer&efh=false&a=v&chrome=false&embedded=true", downloadUrl: data.files[i].webContentLink, mimeType: data.files[i].mimeType, iconLink: data.files[i].iconLink };
                    }
                    newData.push(a)
                }
                if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {

                    this.setState({ filesarray: newData, loading: false });
                    //console.log("different data was received this time.")
                }
            })
    }

    closePreviewModal() {
        this.setState({ PreviewUrl: "", showPreviewModal: false, PreviewFileName: "" })
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
            return <Redirect to='/driveLogin' />

        } else if (this.state['loading'] === false) {
            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return (<Row key={row.id} id={row.id} type={row.type} navHandler={this.navigate.bind(null, row)} iconLink={row.iconLink} mimeType={row.mimeType} filename={row.fileName} size={row.size} lastModified={row.lastModified} downloadUrl={row.downloadUrl}></Row>);
            }.bind(this));

            return (
                <div className="well well-lg pull-down">

                    <div style={{ width: '100%', minHeight: '50px', backgroundColor: '#f5f5f5' }}>
                        <div className="col-lg-6" style={{ padding: '0px' }}>
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={e => { this.setState({ query: e.target.value }) }} onKeyPress={this.performSearch.bind(this)} placeholder="Search for files and folders" />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={this.performSearch}> Search</button>
                                </span>
                            </div>
                        </div>
                    </div>


                    <BreadCrumb pathCollection={this.state['pathCollection']} navigateOutHandler={this.navigateOut.bind(this)} />
                    <ContextMenu root="rows" />
                    <table className="table table-striped table-hover table-responsive well header-fixed">
                        <TableHeading />
                        <tbody id="rows">
                            {rows}
                        </tbody>
                    </table>
                    {this.state["showPreviewModal"] && <FilePreviewModal PreviewFileName={this.state["PreviewFileName"]} PreviewUrl={this.state["PreviewUrl"]} closeModal={this.closePreviewModal}></FilePreviewModal>}
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