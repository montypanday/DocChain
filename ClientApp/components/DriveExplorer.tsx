import * as React from "react";
import { render } from "react-dom";
import { Link, NavLink, Redirect } from "react-router-dom";
import { ContextMenu } from "../components/ContextMenu";
import { LoadingGif, SearchBar, BreadCrumb, BoxLogin } from "../components";
import { FilePreviewModal, DeleteModal, NewFolderModal, ShowShareLinkModal, RenameFileModal } from "./Modals";
import { ButtonToolBar, Row, TableHeading } from "./Table";
import { GSearch, GNavigateIntoFolder, GDelete, Upload, GetPreview, GCreateNewFolder, GRename } from "../api/Google_Utilities";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";
import EmptyFolder from "../components/Alerts/EmptyFolder";
import * as utility from "../components/utility";

import { EmptySearch } from "../components/Alerts/EmptySearch";
require("../css/ContextMenu.css");
require("../css/Explorers.css");

interface DriveExplorerState {
    pathCollection: any;
    filesarray: any;
    loading: any;
    errorFound: any;
    errorMessage: any;
    PreviewUrl: any;
    PreviewFileName: any;
    showPreviewModal: any;
    query: any;
    currentFolderID: any;
    showNewFolderModal: any;
    ToBeDeletedName: any;
    ToBeDeletedID: any;
    ToBeDeletedType: any;
    showDeleteModal: any;
    FolderEmpty: any;
    showRenameModal: any;
    toBeRenameId: any;
    toBeRenameType: any;
    OldName: any;
    SearchEmpty: any;
}

export class DriveExplorer extends React.Component<{}, DriveExplorerState> {
    constructor(props) {
        super(props);
        this.performSearch = this.performSearch.bind(this);
        this.navigate = this.navigate.bind(this);
        this.closePreviewModal = this.closePreviewModal.bind(this);
        this.navigateOut = this.navigateOut.bind(this);
        this.searchInFolder = this.searchInFolder.bind(this);
        this.NewFolderHandler = this.NewFolderHandler.bind(this);
        this.createNewFolderHandler = this.createNewFolderHandler.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.renameHandler = this.renameHandler.bind(this);
        this.closeRenameFileModal = this.closeRenameFileModal.bind(this);
        this.submitRename = this.submitRename.bind(this);
        this.FileUploadHandler = this.FileUploadHandler.bind(this);
        this.getSharedWithMeFolder = this.getSharedWithMeFolder.bind(this);
        this.state = {
            // This is space we will put the json response
            filesarray: {},
            // this is just true or false, determines whether the network request has finished, display a gif or a table
            loading: true,
            errorFound: false,
            errorMessage: "",

            PreviewUrl: "",
            PreviewFileName: "",
            showPreviewModal: false,

            query: "",

            pathCollection: [{ fileId: "root", Name: "All Files" }],

            currentFolderID: "",
            showNewFolderModal: false,

            ToBeDeletedName: "",
            ToBeDeletedID: "",
            ToBeDeletedType: "",
            showDeleteModal: false,

            FolderEmpty: false,

            showRenameModal: false,
            toBeRenameId: false,
            toBeRenameType: "",
            OldName: "",

            SearchEmpty: false
        };
    }

    getSharedWithMeFolder() {
        return {
            type: "folder",
            id: "sharedWithMe",
            fileName: "Shared with Me",
            size: "-",
            hash: "",
            lastModified: "N/A",
            embedLink: "",
            downloadUrl: "",
            mimeType: "application/vnd.google-apps.folder",
            iconLink: ""
        };
    }

    componentDidMount() {
        GNavigateIntoFolder("root").then(newData => {
            newData.unshift(this.getSharedWithMeFolder());
            let isEmpty = newData.length === 0 ? true : false;
            this.setState({ filesarray: newData, loading: false, currentFolderID: "root", FolderEmpty: isEmpty, SearchEmpty: false });
        });
    }

    performSearch(e) {
        this.state.query !== "" &&
            GSearch(this.state.query).then(newData => {
                let isSearchEmpty = newData.length === 0 ? true : false;
                this.setState({
                    filesarray: newData,
                    loading: false,
                    SearchEmpty: isSearchEmpty,
                    pathCollection: [{
                            fileId: "root",
                            Name: "All Files"
                        }]
                });
            });
    }

    navigate(row, event) {
        var newArray;
        row.type === "folder" ?
            (
                newArray = JSON.parse(JSON.stringify(this.state.pathCollection)),
                newArray.push({ fileId: row.id, Name: row.fileName }),
                this.searchInFolder(row.id, newArray)
            ) : (
                GetPreview(row.id)
                    .then(link => {
                        this.setState({ PreviewUrl: link, PreviewFileName: row.fileName, showPreviewModal: true });
                    }));
    }

    navigateOut(e) {
        this.searchInFolder(e.fileId, utility.navigateOutOmitArray(e.fileId, this.state.pathCollection));
    }

    searchInFolder(fileID, newArray) {
        console.log("Searching in folder -> " + fileID);
        GNavigateIntoFolder(fileID).then(newData => {
            this.setState({ currentFolderID: fileID });
            this.state.currentFolderID == "root" && newData.unshift(this.getSharedWithMeFolder());
            let isEmpty = newData.length == 0 ? true : false;
            this.setState({ filesarray: newData, loading: false, pathCollection: newArray, FolderEmpty: isEmpty, SearchEmpty: false });
        });
    }

    closePreviewModal() {
        this.setState({ PreviewUrl: "", showPreviewModal: false, PreviewFileName: "" });
    }

    showPreview() {
        this.setState({ showPreviewModal: true });
    }

    NewFolderHandler(e) {
        this.setState({ showNewFolderModal: true });
    }

    CloseNewFolderModalHandler(e) {
        this.setState({ showNewFolderModal: false });
    }

    createNewFolderHandler(newName) {
        console.log("Creating New Folder with name -> " + newName);
        GCreateNewFolder(this.state.currentFolderID, newName)
            .then(newData => {
                let isEmpty = newData.length == 0 ? true : false;
                this.setState({ filesarray: newData, showNewFolderModal: false, FolderEmpty: isEmpty, SearchEmpty: false });
                toast.success("Folder created successfully!", { hideProgressBar: true });
            });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false, ToBeDeletedID: "", ToBeDeletedName: "", ToBeDeletedType: "" });
    }

    deleteItem() {
        GDelete(this.state.ToBeDeletedID, this.state.currentFolderID)
            .then(newData => {
                let isEmpty = newData.length == 0 ? true : false;
                this.setState({ filesarray: newData, showDeleteModal: false, ToBeDeletedID: "", ToBeDeletedName: "", ToBeDeletedType: "", FolderEmpty: isEmpty });
                toast.success("Deleted successfully!", { hideProgressBar: true });
            });
    }

    showDeleteModal(row, event) {
        this.setState({ showDeleteModal: true, ToBeDeletedID: row.id, ToBeDeletedName: row.fileName, ToBeDeletedType: row.type });
    }

    FileUploadHandler(files) {
        toast.dismiss();
        var toastIndex;
        toastIndex = toast.info("Uploading " + files.length + " files", { autoClose: false, hideProgressBar: true });
        var formData = new FormData();
        var fileList = files;
        for (var x = 0; x < fileList.length; x++) {
            formData.append("file" + x, fileList.item(x));
        }
        var a = "";
        if (files.length == 1) {
            a = "file";
        } else { a = "files"; }
        Upload(this.state.currentFolderID, formData)
            .then(newData => {
                let isEmpty = newData.length == 0 ? true : false;
                this.setState({ filesarray: newData, loading: false, FolderEmpty: isEmpty, SearchEmpty: false });
                toast.update(toastIndex, {
                    autoClose: 5000, hideProgressBar: true, type: "success", render: "Successfully Uploaded " + files.length + " " + a
                });
            }).catch(function (error) {
                console.log(error);

                if (error.status == 409) {
                    toast.update(toastIndex, {
                        autoClose: false, hideProgressBar: true, type: "warning", render: "Cannot Upload File because a file with same name exists"
                    });
                } else {
                    alert(error);
                }
            }.bind(this));
    }

    closeRenameFileModal() {
        this.setState({ showRenameModal: false, toBeRenameId: "", OldName: "", toBeRenameType: "" });
    }

    submitRename(newName) {
        //console.log("Rename will happen here ==>>>>>> "+newName.toString());
        GRename(this.state.toBeRenameId, newName, this.state.currentFolderID, this.state.toBeRenameType)
            .then(newData => {
                this.setState({ filesarray: newData, showRenameModal: false });
                toast.success("Item Renamed Successfully!", { hideProgressBar: true });
            })
            .catch(function (error) {
                this.setState({ toBeRenameId: "", showRenameModal: false, OldName: "", toBeRenameType: "" });
                toast.error("Rename Failed");
            }.bind(this));
    }

    renameHandler(row, event) {
        //Rename()
        console.log(row);
        this.setState({ showRenameModal: true, toBeRenameId: row.id, OldName: row.fileName, toBeRenameType: row.type });
    }

    public render() {
        if (this.state.loading === false) {
            var rows;
            if (this.state.SearchEmpty) {
                rows = <EmptySearch />;
            } else {
                rows = this.state.filesarray.map(function (row) {
                    return (<Row
                        key={row.id}
                        id={row.id}
                        type={row.type}
                        navHandler={this.navigate.bind(null, row)}
                        mimeType={row.mimeType}
                        filename={row.fileName}
                        size={row.size}
                        lastModified={row.lastModified}
                        platform={"Drive"}
                        deleteHandler={this.showDeleteModal.bind(null, row)}

                        downloadHandler=""

                        shareLinkHandler=""
                        renameHandler={this.renameHandler.bind(null, row)}>
                    </Row>);
                }.bind(this));
            }
            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.

            return (
                <div className="well well-lg pull-down">
                    <ToastContainer position="bottom-right" toastClassName={css({ fontFamily: "Europa, Serif", paddingLeft: "15px" })} />
                    <div style={{ float: "right" }} className="user-details">
                        <ButtonToolBar NewFolderHandler={this.NewFolderHandler} uploadHandler={this.FileUploadHandler} ></ButtonToolBar>
                    </div>
                    <SearchBar changeHandler={e => { this.setState({ query: e.target.value }); }} searchHandler={this.performSearch}></SearchBar>
                    <BreadCrumb pathCollection={this.state.pathCollection} navigateOutHandler={this.navigateOut.bind(this)} />

                    <table className="table table-striped table-hover table-responsive well header-fixed">
                        <TableHeading />
                        < tbody >
                            {!this.state.FolderEmpty ?
                                rows
                                :
                                <EmptyFolder />
                            }
                        </tbody>
                    </table>
                    {this.state.showRenameModal &&
                        <RenameFileModal oldFileName={this.state.OldName} newFileNameHandler={this.submitRename} closeRenameModal={this.closeRenameFileModal}>
                        </RenameFileModal>}
                    {this.state.showPreviewModal && <FilePreviewModal PreviewFileName={this.state.PreviewFileName} PreviewUrl={this.state.PreviewUrl} closeModal={this.closePreviewModal}></FilePreviewModal>}
                    {this.state.showNewFolderModal && <NewFolderModal closeHandler={this.CloseNewFolderModalHandler} createFolderHandler={this.createNewFolderHandler} ></NewFolderModal>}
                    {this.state.showDeleteModal && <DeleteModal fileName={this.state.ToBeDeletedName} id={this.state.ToBeDeletedID} type={this.state.ToBeDeletedType} closeHandler={this.closeDeleteModal} deleteActionHandler={this.deleteItem}></DeleteModal>}
                </div>
            );
        } else {
            // determine if that loading is finished and render accordinglyf
            return (
                <div className="loadingGif">
                    <LoadingGif />
                    <p>Loading...</p>
                </div>
            );
        }
    }
}