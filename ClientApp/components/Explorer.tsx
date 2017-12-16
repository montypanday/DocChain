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

export class Explorer extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.formatSizeUnits = this.formatSizeUnits.bind(this);
        this.searchRoot = this.searchRoot.bind(this);
        this.navigate = this.navigate.bind(this);
        this.closePreviewModal = this.closePreviewModal.bind(this);
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

            showPreviewModal: false,

        }
    }

    searchRoot() {
        fetch("https://api.box.com/2.0/folders/0/items?fields=name,size,id,type,sha1,path_collection,modified_at,shared_link,expiring_embed_link", {
            method: "GET",
            headers:
            {
                'Authorization': 'Bearer ' + sessionStorage.getItem("box_access_token"),
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
                for (var i = 0; i < data["entries"].length; i++) {

                    var a = {};
                    if (data.entries[i].type == "file") {
                        //console.log(data.entries[i].type);
                        a = { type: data.entries[i].type, id: data.entries[i].id, fileName: data.entries[i].name, size: this.formatSizeUnits(data.entries[i].size), hash: data.entries[i].sha1, lastModified: (new Date(Date.parse(data.entries[i].modified_at.toString()))).toUTCString(), embedLink: data.entries[i].expiring_embed_link.url, downloadUrl: "" }
                    }
                    else {
                        a = { type: data.entries[i].type, id: data.entries[i].id, fileName: data.entries[i].name, size: this.formatSizeUnits(data.entries[i].size), hash: "", lastModified: (new Date(Date.parse(data.entries[i].modified_at.toString()))).toUTCString(), embedLink: "", downloadUrl: "" }
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
        else { bytes = '0 byte'; }
        return bytes;
    }

    componentDidMount() {
        this.searchRoot();
    }

    handleSearchBarChange(e) {
        console.log("searching => " + e.target.value);
        this.setState({ query: e.target.value });
        if (this.state['query'] == "") {
            this.searchRoot();
        }
    }

    performSearch(e) {
        var querystring = this.state['query'];
        if (querystring == "") { this.searchRoot(); }
        else {
            fetch("https://api.box.com/2.0/search?query=" + querystring + "&fields=name,size,id,type,sha1,path_collection,modified_at,shared_link,expiring_embed_link", {
                method: "GET",
                headers:
                {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("box_access_token"),
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) { throw response }
                    return response.json()  //we only get here if there is no error)
                })
                .then(data => {

                    var newData = [];
                    for (var i = 0; i < data["entries"].length; i++) {

                        var a = {};
                        if (data.entries[i].type == "file") {

                            a = { type: data.entries[i].type, id: data.entries[i].id, fileName: data.entries[i].name, size: this.formatSizeUnits(data.entries[i].size), hash: data.entries[i].sha1, lastModified: (new Date(Date.parse(data.entries[i].modified_at.toString()))).toUTCString(), embedLink: data.entries[i].expiring_embed_link.url, downloadUrl: "" }
                        }
                        else {
                            a = { type: data.entries[i].type, id: data.entries[i].id, fileName: data.entries[i].name, size: this.formatSizeUnits(data.entries[i].size), hash: "", lastModified: (new Date(Date.parse(data.entries[i].modified_at.toString()))).toUTCString(), embedLink: "", downloadUrl: "" }
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
    navigate(row,event) {

        console.log(row);
        if (row.type == "folder")
        {

        }
        if (row.type == "file")
        {
            this.setState({ PreviewUrl: row.embedLink, PreviewFileName: row.fileName, showPreviewModal: true })
        }

    }

    closePreviewModal() {
        this.setState({ PreviewUrl: "", showPreviewModal: false, PreviewFileName: "" })
    }

    showPreview() {
        this.setState({ showingPreview: true });
    }

    public render() {
        if (sessionStorage.getItem("box_access_token") == null) {
            return <Redirect to='/boxLogin' />

        } else if (this.state['loading'] === false) {

            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return (<Row key={row.ID} id={row.ID} navHandler={this.navigate.bind(null,row)} filename={row.fileName} size={row.size} lastModified={row.lastModified} downloadUrl={row.downloadUrl}></Row>);
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
                    <Modal show={this.state["showPreviewModal"]}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">{this.state['PreviewFileName']}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <embed src={this.state["PreviewUrl"]}></embed>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.closePreviewModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }

        // determine if that loading is finished and render accordingly
        else
            return (
                <div className="loadingGif">
                    <LoadingGif />
                    <p>Loading...</p>
                </div>
            );
    }
}