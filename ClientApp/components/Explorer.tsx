import * as React from "react";
import { render } from "react-dom";
import { ButtonToolBar, Row, TableHeading } from "./Table";
import { Link, NavLink, Redirect } from "react-router-dom";
import { LoadingGif, SearchBar, BreadCrumb, BoxLogin } from "../components";
import { FilePreviewModal, DeleteModal, NewFolderModal, ShowShareLinkModal, RenameFileModal } from "./Modals";
import { Search, Delete, Upload, GetFolderItemsAsync, getPreviewLink, CreateNewFolder, Rename, getSharedLink, Download } from "../api/Box_Utilities";
import { Alert } from "react-bootstrap";
import AlertCollection from "../components/Alerts/AlertCollection";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";
import EmptyFolder from "../components/Alerts/EmptyFolder";
import * as utility from "../components/utility";
import { EmptySearch } from "../components/Alerts/EmptySearch";
import { saveAs } from "file-saver";
import { ContextMenu } from "./contextmenu";


interface ExplorerState {
    // This is space we will put the json response
    filesarray: any,
    // this is just true or false, determines whether the network request has finished, display a gif or a table
    loading: any,
    errorFound: any,
    errorMessage: any,

    PreviewUrl: any,
    PreviewFileName: any,
    showPreviewModal: any,

    query: any,
    user: any,

    showRenameModal: any,
    toBeRenameId: any,
    toBeRenameType: any,
    OldName: any,

    showDeleteModal: any,
    pathCollection: any,
    show401Alert: any,
    currentFolderID: any,
    showNewFolderModal: any,
    ToBeDeletedName: any,
    ToBeDeletedID: any,
    ToBeDeletedType: any,
    ToBeUploadedFiles: any,
    FolderEmpty: any,
    filesPreview: any,
    filesToBeSent: any,
    SearchEmpty: any,
    showShareModal: any,

    tempShareURL: any
}

export class Explorer extends React.Component<{}, ExplorerState> {
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
        this.renameHandler = this.renameHandler.bind(this);
        this.closeRenameFileModal = this.closeRenameFileModal.bind(this);
        this.submitRename = this.submitRename.bind(this);
        this.shareLinkHandler = this.shareLinkHandler.bind(this);
        this.closeShareModal = this.closeShareModal.bind(this);
        this.download = this.download.bind(this);

        this.FileUploadHandler = this.FileUploadHandler.bind(this);
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
            user: "",

            showRenameModal: false,
            toBeRenameId: false,
            toBeRenameType: "",
            OldName: "",

            showDeleteModal: false,
            pathCollection: [{ fileId: "0", Name: "All Files" }],
            show401Alert: false,
            currentFolderID: "",
            showNewFolderModal: false,
            ToBeDeletedName: "",
            ToBeDeletedID: "",
            ToBeDeletedType: "",
            ToBeUploadedFiles: {},
            FolderEmpty: false,
            filesPreview: [],
            filesToBeSent: [],
            SearchEmpty: false,
            showShareModal: false,

            tempShareURL: ""
        };
    }

    componentDidMount() {
        GetFolderItemsAsync("0").then(newData => {
            let isEmpty = newData.length == 0 ? true : false;
            this.setState({ filesarray: newData, loading: false, show401Alert: false, currentFolderID: "0", FolderEmpty: isEmpty });
        })
            .catch(function (error) {
                this.setState({ loading: false, filesarray: [], show401Alert: true, SearchEmpty: false });
            }.bind(this));
    }

    handleSearchBarChange(e) { this.setState({ query: e.target.value }); }

    performSearch(e) {
        this.state.query !== "" && Search(this.state.query).then(newData => {
            let isSearchEmpty = newData.length == 0 ? true : false;
            this.setState({ filesarray: newData, loading: false, SearchEmpty: isSearchEmpty, pathCollection: [{ fileId: "0", Name: "All Files" }] });
        });
    }

    navigate(row, event) {
        var ToastIndex, newArray2;
        row.type == "folder" ?
            (
                newArray2 = JSON.parse(JSON.stringify(this.state.pathCollection)),
                newArray2.push({ fileId: row.id, Name: row.fileName }),
                this.searchInFolder(row.id, newArray2)
            ) :
            (
                getPreviewLink(row.id).then(link => {
                    this.setState({ PreviewUrl: link, PreviewFileName: row.fileName, showPreviewModal: true });
                }).catch(function (error) {
                    console.log(error);
                    toast.dismiss();
                    error.status == 415 ?
                        (
                            ToastIndex = toast.error("File Preview for this file format is not supported yet", { hideProgressBar: true, position: "bottom-right", onClose: () => toast.dismiss(ToastIndex) })
                        ) :
                        (alert(error));
                }.bind(this))
            );
    }

    navigateOut(e) {
        this.searchInFolder(e.fileId, utility.navigateOutOmitArray(e.fileId, this.state.pathCollection));
    }

    searchInFolder(id, newArray) {
        GetFolderItemsAsync(id).then(newData => {
            let isEmpty = newData.length == 0 ? true : false;
            this.setState({ filesarray: newData, loading: false, pathCollection: newArray, currentFolderID: id, FolderEmpty: isEmpty, SearchEmpty: false });
        });
    }

    NewFolderHandler(e) { this.setState({ showNewFolderModal: true }); }

    CloseNewFolderModalHandler(e) { this.setState({ showNewFolderModal: false }); }

    createNewFolderHandler(newName) {
        CreateNewFolder(this.state.currentFolderID, newName)
            .then(newData => {
                this.setState({ filesarray: newData, showNewFolderModal: false });
                toast.success("Folder created successfully!", { hideProgressBar: true });
            });
    }

    closePreviewModal() { this.setState({ PreviewUrl: "", showPreviewModal: false, PreviewFileName: "" }); }

    showPreview() { this.setState({ showPreviewModal: true }); }

    getUser() {
        fetch("https://api.box.com/2.0/users/me", {
            method: "GET",
            headers:
                {
                    "Authorization": "Bearer " + sessionStorage.getItem("box_access_token"),
                    "Accept": "application/json"
                }
        })
            .then(response => {
                if (!response.ok) { throw response; }
                return response.json();  //we only get here if there is no error)
            })
            .then(data => {
                var user = data.name;
                console.log(user);
                this.setState({ user: user });
            });
    }

    closeDeleteModal() { this.setState({ showDeleteModal: false, ToBeDeletedID: "", ToBeDeletedName: "", ToBeDeletedType: "" }); }

    shareLinkHandler(row, event) {
        getSharedLink(row.id, row.type)
            .then(response => {
                console.log("this is shared link " + response);
                this.setState({ showShareModal: true, tempShareURL: response });
            })
            .catch(function (error) {
                toast.error("Operation Failed: Could not get Share Link!");
            }.bind(this));
    }

    closeShareModal() { this.setState({ showShareModal: false, tempShareURL: "" }); }

    showDeleteModal(row, event) { this.setState({ showDeleteModal: true, ToBeDeletedID: row.id, ToBeDeletedName: row.fileName, ToBeDeletedType: row.type }); }

    deleteItem() {
        Delete(this.state.ToBeDeletedType, this.state.ToBeDeletedID, this.state.currentFolderID)
            .then(newData => {
                let isEmpty = newData.length == 0 ? true : false;
                this.setState({ filesarray: newData, showDeleteModal: false, ToBeDeletedID: "", ToBeDeletedName: "", ToBeDeletedType: "", FolderEmpty: isEmpty, SearchEmpty: false });
                toast.success("Deleted successfully!", { hideProgressBar: true });
            });
    }

    closeRenameFileModal() { this.setState({ showRenameModal: false, toBeRenameId: "", OldName: "", toBeRenameType: "" }); }

    submitRename(newName) {
        //console.log("Rename will happen here ==>>>>>> "+newName.toString());
        Rename(this.state.toBeRenameId, newName, this.state.currentFolderID, this.state.toBeRenameType)
            .then(newData => {
                this.setState({ filesarray: newData, showRenameModal: false });
                toast.success("Item Renamed Successfully!", { hideProgressBar: true });
            })
            .catch(function (error) {
                this.setState({ toBeRenameId: "", showRenameModal: false, OldName: "", toBeRenameType: "" });
                toast.error("Rename Failed");
            }.bind(this));
    }

    download(row, event) {
        console.log(row);
        var toastIndex = toast.info("Downloading " + row.fileName, { autoClose: false, hideProgressBar: true });
        Download(row.id).then(blobb => {
            console.log(blobb);
            saveAs(blobb, row.fileName);
            toast.update(toastIndex, {
                autoClose: 5000, hideProgressBar: true, type: "success", render: "Download complete: " + row.fileName
            });
        })
            .catch(function (error) {
                console.log(error);
                toast.update(toastIndex, {
                    autoClose: 5000, hideProgressBar: true, type: "error", render: "Download Failed: " + row.fileName
                });
            });
    }

    renameHandler(row, event) {
        this.setState({ showRenameModal: true, toBeRenameId: row.id, OldName: row.fileName, toBeRenameType: row.type });
    }

    notify = () => toast.success("Folder created successfully!", { hideProgressBar: true });

    FileUploadHandler(files) {
        var toastIndex, placeholder, formData, fileList;
        toast.dismiss();
        placeholder = files.length == 1 ? "file" : "files";
        toastIndex = toast.info("Uploading " + files.length + " " + placeholder, { autoClose: false, hideProgressBar: true });
        formData = new FormData(); 1;
        fileList = files;
        for (var x = 0; x < fileList.length; x++) {
            formData.append("file" + x, fileList.item(x));
        }
        Upload(this.state.currentFolderID, formData)
            .then(newData => {
                let isEmpty = newData.length == 0 ? true : false;
                this.setState({ filesarray: newData, loading: false, FolderEmpty: isEmpty, SearchEmpty: false });
                toast.update(toastIndex, {
                    autoClose: 5000, hideProgressBar: true, type: "success", render: "Successfully Uploaded " + files.length + " " + placeholder
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

    public render() {
        console.log("Explorer was rendered");

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
                        downloadHandler={this.download.bind(null, row)}
                        mimeType=""
                        filename={row.fileName}
                        size={row.size}
                        lastModified={row.lastModified}
                        shareLinkHandler={this.shareLinkHandler.bind(null, row)}
                        renameHandler={this.renameHandler.bind(null, row)}
                        deleteHandler={this.showDeleteModal.bind(null, row)}
                        platform={"Box"}>
                    </Row>);
                }.bind(this));
            }

            return (
                <div className="well pull-down" id="target">
                    <ContextMenu root="target"/>
                    <ToastContainer position="bottom-right" hideProgressBar={true} pauseOnHover={true} newestOnTop={true} toastClassName={css({ fontFamily: "Europa, Serif", paddingLeft: "15px" })} />

                    <div style={{ float: "right" }} className="user-details">
                        {/*this.state['user']*/}
                        <ButtonToolBar NewFolderHandler={this.NewFolderHandler} uploadHandler={this.FileUploadHandler} ></ButtonToolBar>
                    </div>
                    <SearchBar changeHandler={e => { this.setState({ query: e.target.value }); }} searchHandler={this.performSearch}></SearchBar>

                    {this.state.show401Alert &&
                        <Alert bsStyle="warning">
                            <strong>401 Unauthorized </strong> Please sign in first
                        </Alert>}
                    {this.state.show401Alert && <BoxLogin></BoxLogin>}
                    {!this.state.show401Alert && <BreadCrumb pathCollection={this.state.pathCollection} navigateOutHandler={this.navigateOut.bind(this)} />}
                    {!this.state.show401Alert && < table className="table table-striped table-hover table-responsive well header-fixed">
                        <TableHeading />
                        <tbody>
                            {!this.state.FolderEmpty ?
                                rows
                                :
                                <EmptyFolder />
                            }
                        </tbody></table>}

                    {this.state.showPreviewModal &&
                        <FilePreviewModal PreviewFileName={this.state.PreviewFileName} PreviewUrl={this.state.PreviewUrl} closeModal={this.closePreviewModal}>
                        </FilePreviewModal>}
                    {this.state.showRenameModal &&
                        <RenameFileModal oldFileName={this.state.OldName} newFileNameHandler={this.submitRename} closeRenameModal={this.closeRenameFileModal}>
                        </RenameFileModal>}
                    {this.state.showDeleteModal &&
                        <DeleteModal fileName={this.state.ToBeDeletedName} id={this.state.ToBeDeletedID} type={this.state.ToBeDeletedType} closeHandler={this.closeDeleteModal} deleteActionHandler={this.deleteItem}>
                        </DeleteModal>}
                    {this.state.showShareModal &&
                        <ShowShareLinkModal url={this.state.tempShareURL} closeHandler={this.closeShareModal} ></ShowShareLinkModal>}
                    {this.state.showNewFolderModal &&
                        <NewFolderModal closeHandler={this.CloseNewFolderModalHandler} createFolderHandler={this.createNewFolderHandler} >
                        </NewFolderModal>}
                </div>
            );
        } else {
            return (
                <div className="loadingGif">
                    <LoadingGif />
                    <p>Loading...</p>
                </div>
            );
        }
    }
}