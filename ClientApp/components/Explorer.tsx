import * as React from 'react';
import { render } from 'react-dom';
import { LoadingGif } from '../components/loadingGif';
import { SearchBar } from '../components/SearchBar';
import { Row } from '../components/Table/Row';
import { Link, NavLink, Redirect } from "react-router-dom";
import { BreadCrumb } from '../components/breadCrumb';
require('../css/breadcrumb.css');
import { formatSizeUnits } from '../api/Helpers/FormatSize';
import { getPreviewLink } from '../api/Box/GetPreviewLink';
import FilePreviewModal from '../components/Modals/FilePreviewModal';
import TableHeading from '../components/Table/TableHeading';
import FileRenameModal from '../components/Modals/RenameFileModal';
import DeleteModal from '../components/Modals/DeleteModal';
import NewFolderModal from '../components/Modals/NewFolderModal';

import ShowShareLinkModal from '../components/Modals/ShowShareLinkModal';
import { GetFolderItemsAsync } from '../api/Box/GetFolderItemsAsync';
import ButtonToolBar from '../components/Table/ButtonToolbar';
import { Alert } from 'react-bootstrap';
import { BoxLogin } from '../components/BoxLogin';
import AlertCollection from '../components/Alerts/AlertCollection';
import { CreateNewFolder } from '../api/Box/CreateNewFolder';
import { ToastContainer, toast } from 'react-toastify';
import { Search } from '../api/Box/Search';
import { Delete } from '../api/Box/Delete';

export class Explorer extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.navigate = this.navigate.bind(this);
        this.navigateOut = this.navigateOut.bind(this);
        this.NewFolderHandler = this.NewFolderHandler.bind(this);
        this.closePreviewModal = this.closePreviewModal.bind(this);
        this.CloseNewFolderModalHandler = this.CloseNewFolderModalHandler.bind(this);
        this.createNewFolderHandler = this.createNewFolderHandler.bind(this);
        this.searchInFolder = this.searchInFolder.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
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
            user: "",
            showRenameModal: false,
            showDeleteModal: false,
            pathCollection: [{ fileId: "0", Name: "All Files" }],
            show401Alert: false,
            currentFolderID: "",
            showNewFolderModal: false,
            ToBeDeletedName: "",
            ToBeDeletedID: "",
            ToBeDeletedType: ""
        }
    }
    componentDidMount() {
        GetFolderItemsAsync("0").then(newData => {
            if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {
                this.setState({ filesarray: newData, loading: false, show401Alert: false, currentFolderID: "0" });
                //console.log("different data was received this time.")
                //NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
            }
        })
            .catch(function (error) {
                console.log(error.status);
                this.setState({ loading: false, filesarray: [], show401Alert: true });
            }.bind(this));
    }
    handleSearchBarChange(e) {
        console.log("searching => " + e.target.value);
        this.setState({ query: e.target.value });
    }
    performSearch(e) {
        if (this.state["query"] !== "") {
            Search(this.state["query"]).then(newData => {
                if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {
                    this.setState({ filesarray: newData, loading: false, pathCollection: [{ fileId: "0", Name: "All Files" }] });
                }
            });
        }

    }
    navigate(row, event) {
        if (row.type == "folder") {
            console.log("Navigated into folder ->" + row.fileName);
            var newArray = this.state["pathCollection"];
            var newArray2 = JSON.parse(JSON.stringify(newArray));
            newArray2.push({ fileId: row.id, Name: row.fileName });
            this.searchInFolder(row.id, newArray2);
            return;
        }
        if (row.type == "file") {
            getPreviewLink(row.id).then(link => {
                this.setState({ PreviewUrl: link, PreviewFileName: row.fileName, showPreviewModal: true })
            });
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
        var coll2 = JSON.parse(JSON.stringify(coll));
        this.searchInFolder(e.fileId, coll2);
    }
    searchInFolder(id, newArray) {
        GetFolderItemsAsync(id).then(newData => {
            if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {
                this.setState({ filesarray: newData, loading: false, pathCollection: newArray, currentFolderID: id });
            }
        });
    }
    NewFolderHandler(e) {
        console.log("Let's open a modal to make new Folder");
        this.setState({ showNewFolderModal: true });
    }
    CloseNewFolderModalHandler(e) {
        console.log("Closing New Folder Handler");
        this.setState({ showNewFolderModal: false });
    }
    createNewFolderHandler(newName) {
        console.log("Creating New Folder with name -> " + newName);
        CreateNewFolder(this.state["currentFolderID"], newName)
            .then(newData => {
                this.setState({ filesarray: newData, showNewFolderModal: false });
                toast.success("Folder created successfully!", { hideProgressBar: true });
            });
    }
    closePreviewModal() {
        this.setState({ PreviewUrl: "", showPreviewModal: false, PreviewFileName: "" })
    }
    closeRenameFileModal() {
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
    closeDeleteModal() {
        this.setState({ showDeleteModal: false, ToBeDeletedID: "", ToBeDeletedName: "", ToBeDeletedType: "" });
    }
    showDeleteModal(row, event) {
        this.setState({ showDeleteModal: true, ToBeDeletedID: row.id, ToBeDeletedName: row.fileName, ToBeDeletedType: row.type });
    }
    deleteItem() {
        console.log("id ->" + this.state["ToBeDeletedID"]);
        console.log("type ->" + this.state["ToBeDeletedType"]);
        Delete(this.state["ToBeDeletedType"], this.state["ToBeDeletedID"], this.state["currentFolderID"])
            .then(newData => {
                this.setState({ filesarray: newData, showDeleteModal: false, ToBeDeletedID: "", ToBeDeletedName: "", ToBeDeletedType: "" });
                toast.success("Deleted successfully!", { hideProgressBar: true });
            });
    }

    notify = () => toast.success("Folder created successfully!", { hideProgressBar: true });

    public render() {
        console.log("Explorer was rendered");

        if (this.state['loading'] === false) {
            //this.getUser();

            var rows = this.state['filesarray'].map(function (row) {
                return (<Row key={row.id} id={row.id} type={row.type} navHandler={this.navigate.bind(null, row)} mimeType="" iconLink="" filename={row.fileName} size={row.size} lastModified={row.lastModified} downloadUrl={row.downloadUrl} deleteHandler={this.showDeleteModal.bind(null, row)}></Row>);
            }.bind(this));

            return (
                <div className="well well-lg pull-down">
                    <ToastContainer position="bottom-right" />
                    <div style={{ float: 'right' }} className="user-details">
                        {/*this.state['user']*/}
                        <ButtonToolBar NewFolderHandler={this.NewFolderHandler}  ></ButtonToolBar>
                    </div>
                    <SearchBar changeHandler={e => { this.setState({ query: e.target.value }) }} searchHandler={this.performSearch}></SearchBar>

                    {this.state["show401Alert"] &&
                        <Alert bsStyle="warning">
                            <strong>401 Unauthorized </strong> Please sign in first
                        </Alert>}
                    {this.state["show401Alert"] && <BoxLogin></BoxLogin>}

                    {!this.state["show401Alert"] && <BreadCrumb pathCollection={this.state["pathCollection"]} navigateOutHandler={this.navigateOut.bind(this)} />}
                    {!this.state["show401Alert"] && < table className="table table-striped table-hover table-responsive well header-fixed">
                        <TableHeading />
                        <tbody>
                            {rows}
                        </tbody>
                    </table>}

                    {this.state["showPreviewModal"] &&
                        <FilePreviewModal PreviewFileName={this.state["PreviewFileName"]} PreviewUrl={this.state["PreviewUrl"]} closeModal={this.closePreviewModal}>
                        </FilePreviewModal>}
                    {this.state["showRenameModal"] &&
                        <FileRenameModal RenameFileName={this.state["RenameFileName"]} closeRenameModal={this.closeRenameFileModal}>
                        </FileRenameModal>}
                    {this.state["showDeleteModal"] &&
                        <DeleteModal fileName={this.state["ToBeDeletedName"]} id={this.state["ToBeDeletedId"]} type={this.state["ToBeDeletedType"]} closeHandler={this.closeDeleteModal} deleteActionHandler={this.deleteItem}>
                        </DeleteModal>}
                    {this.state["showShareModal"] &&
                        <ShowShareLinkModal></ShowShareLinkModal>}
                    {this.state["showNewFolderModal"] &&
                        <NewFolderModal closeHandler={this.CloseNewFolderModalHandler} createFolderHandler={this.createNewFolderHandler} >
                        </NewFolderModal>}
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