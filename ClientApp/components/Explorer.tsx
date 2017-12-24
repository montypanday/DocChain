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
import { searchRoot } from '../api/Box/SearchRoot';
import { formatSizeUnits } from '../api/Helpers/FormatSize';
import { getPreviewLink } from '../api/Box/GetPreviewLink';
import FilePreviewModal from '../components/Modals/FilePreviewModal';
import TableHeading from '../components/Table/TableHeading';

export class Explorer extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
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

            user: "",
        }
    }

    componentDidMount() {
        searchRoot().then(newData => {
            if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {
                this.setState({ filesarray: newData, loading: false });
                //console.log("different data was received this time.")
            }
        });
        this.getUser();
    }

    handleSearchBarChange(e) {
        console.log("searching => " + e.target.value);
        this.setState({ query: e.target.value });
        if (this.state['query'] == "") {
            searchRoot();
        }
    }

    performSearch(e) {
        var querystring = this.state['query'];
        if (querystring == "") { /*this.searchRoot(); */ }
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

                            a = { type: data.entries[i].type, id: data.entries[i].id, fileName: data.entries[i].name, size: formatSizeUnits(data.entries[i].size), hash: data.entries[i].sha1, lastModified: (new Date(Date.parse(data.entries[i].modified_at.toString()))).toUTCString(), embedLink: data.entries[i].expiring_embed_link.url, downloadUrl: "" }
                        }
                        else {
                            a = { type: data.entries[i].type, id: data.entries[i].id, fileName: data.entries[i].name, size: formatSizeUnits(data.entries[i].size), hash: "", lastModified: (new Date(Date.parse(data.entries[i].modified_at.toString()))).toUTCString(), embedLink: "", downloadUrl: "" }
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
    navigate(row, event) {

        console.log(row);
        if (row.type == "folder") {

        }

        if (row.type == "file") {
            getPreviewLink(row.id).then(link => {
                this.setState({ PreviewUrl: link, PreviewFileName: row.fileName, showPreviewModal: true })
            });
        }

    }

    closePreviewModal() {
        this.setState({ PreviewUrl: "", showPreviewModal: false, PreviewFileName: "" })
    }

    showPreview() {
        this.setState({ showingPreview: true });
    }

    getUser() {
        fetch("https://api.box.com/2.0/users/me", {
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
                var user = data['name']
                console.log(user)
                this.setState({ user: user });
            })
    }

    public render() {
        if (this.state['loading'] === false) {
            //this.getUser();
            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return (<Row key={row.id} id={row.id} type={row.type} navHandler={this.navigate.bind(null, row)} mimeType="" iconLink="" filename={row.fileName} size={row.size} lastModified={row.lastModified} downloadUrl={row.downloadUrl}></Row>);
            }.bind(this));

            return (
                <div className="well well-lg pull-down">
                    <div style={{ float: 'right' }} className="user-details">
                        {this.state['user']}
                    </div>
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
                        <a /*{this.searchRoot}*/>All Files</a>
                        <a href="#">Compare</a>
                        <a href="#">Order Confirmation</a>
                        <a href="#" className="active">Checkout</a>
                    </div>
                    <table className="table table-striped table-hover table-responsive well header-fixed">
                        <TableHeading/>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                    {this.state["showPreviewModal"] && <FilePreviewModal PreviewFileName={this.state["PreviewFileName"]} PreviewUrl={this.state["PreviewUrl"]} closeModal={this.closePreviewModal}></FilePreviewModal>}
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