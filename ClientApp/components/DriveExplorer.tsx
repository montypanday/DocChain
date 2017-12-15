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

export class DriveExplorer extends React.Component<{}, {}> {

    constructor() {
        super();
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.formatSizeUnits = this.formatSizeUnits.bind(this);
        this.searchRoot = this.searchRoot.bind(this);
        this.navigate = this.navigate.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

        }
    }

    searchRoot() {
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
                    if (data.files[i].kind == "drive#file") {
                        //console.log(data.entries[i].type);
                        a = { type: data.files[i].kind, id: data.files[i].id, fileName: data.files[i].name, size: this.formatSizeUnits(data.files[i].size), hash: data.files[i].md5Checksum, lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: data.files[i].webViewLink, downloadUrl: data.files[i].webContentLink }
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
        // this is the network call made everytime the page is reload, before the render method.
        //fetch("/api/Login/GetGoogleSession?google_access_token=" + sessionStorage.getItem("google_access_token") + "&google_refresh_token=" + sessionStorage.getItem("google_refresh_token"))
        //    .then(response => {
        //        if (!response.ok) { throw response }
        //        return response.json()  //we only get here if there is no error)
        //    })
        //    .then(data => {
        //        this.setState({ filesarray: data, loading: false });
        //    })
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
        if (querystring == ""){this.searchRoot }
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
                            a = { type: data.files[i].kind, id: data.files[i].id, fileName: data.files[i].name, size: this.formatSizeUnits(data.files[i].size), hash: data.files[i].md5Checksum, lastModified: (new Date(Date.parse(data.files[i].modifiedTime.toString()))).toUTCString(), embedLink: data.files[i].webViewLink, downloadUrl: data.files[i].webContentLink }
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

    }//"https://docs.google.com/viewer?url="+
    navigate(row,event)
    {
        var res = row.embedLink.toString();
        var str = res.replace("view", "preview");
        console.log(row);
<<<<<<< HEAD
        this.setState({ PreviewUrl: str, PreviewFileName: row.fileName, showModal: true})
=======
        if (row.type == "folder") {

        }
        if (row.type == "drive#file") {
            this.setState({ PreviewUrl: row.embedLink, PreviewFileName: row.fileName, showModal: true })
        }
>>>>>>> 856470a51b9640303e6c7cddde4b8bc7e4b7bbe3
    }

    closeModal() {
        this.setState({PreviewUrl: "", showModal: false, PreviewFileName: ""})
    }

    showPreview() {
        this.setState({ showingPreview: true });
    }

    public render() {

        if (sessionStorage.getItem("google_access_token") == null) {
            return <Redirect to='/driveLogin' />

        } else if (this.state['loading'] === false) {

            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return (<Row key={row.ID} id={row.ID} navHandler={this.navigate.bind(null, row)} filename={row.fileName} size={row.size} lastModified={row.lastModified} downloadUrl={row.downloadUrl}></Row>);
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
                        <a onClick={this.searchRoot}>All Files</a>
                        <a href="#">Compare</a>
                        <a href="#">Order Confirmation</a>
                        <a href="#" className="active">Checkout</a>
                    </div>
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
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    <Modal show={this.state["showModal"]} bsSize="large" >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">{this.state['PreviewFileName']}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
<<<<<<< HEAD
                            <iframe src={this.state["PreviewUrl"]} width ='200px' height ='200px'></iframe>
=======
                            <embed src={this.state["PreviewUrl"]}></embed>
>>>>>>> 856470a51b9640303e6c7cddde4b8bc7e4b7bbe3
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