import * as React from 'react';
import { render } from 'react-dom';
import { LoadingGif } from '../components/loadingGif';
import { SearchBar } from '../components/SearchBar';
import { Row } from '../components/Row';
import { BreadCrumb } from '../components/breadCrumb';
import { Link, NavLink } from "react-router-dom";
//import { Modal } from '../components/Modal';

export class Explorer extends React.Component<{}, {}> {
    constructor() {
        super();

        this.state = {
            // This is space we will put the json response
            filesarray: {},

            // this is just true or false, determines whether the network request has finished, display a gif or a table
            loading: true,

            errorFound: false,

            errorMessage: "",

            //isOpen: false,

            PreviewUrl: "",

            // Default item id. 0 is default denotes root folder.
            // Change this to get items from another folder.
            item_id: 0
        }

    }

    componentDidMount() {
        //this is the network call made everytime the page is reload, before the render method.
        //fetch("/api/Login/GetBoxFiles/?token=" + sessionStorage.getItem("OAuthSession"))
        //    .then(response => {
        //        if (!response.ok) { throw response }
        //        return response.json()  //we only get here if there is no error)
        //    })
        //    .then(data => {
        //        // console messages in order to help you understand what's happening
        //        //console.log(data);
        //        this.setState({ filesarray: data, loading: false });
        //        console.log("this is filearray->>>   " + JSON.stringify(this.state['filesarray']));
        //    })
        fetch("https://api.box.com/2.0/folders/0/items?fields=name,size,id,type,sha1,path_collection,modified_at,shared_link,expiring_embed_link",
            {
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

                console.log(data);
                var newData = [];
                for (var i = 0; i < data["entries"].length; i++) {

                    var a = {};
                    if (data.entries[i].type == "file") {
                        console.log(data.entries[i].type);
                        a = { type: data.entries[i].type, id: data.entries[i].id, fileName: data.entries[i].name, size: data.entries[i].size, hash: data.entries[i].sha1, lastModified: data.entries[i].modified_at, embedLink: data.entries[i].expiring_embed_link.url, downloadUrl: "" }
                    }
                    else {
                        a = { type: data.entries[i].type, id: data.entries[i].id, fileName: data.entries[i].name, size: data.entries[i].size, hash: "", lastModified: data.entries[i].modified_at, embedLink: "", downloadUrl: "" }
                    }

                    newData.push(a)

                }
                if (JSON.stringify(newData) != JSON.stringify(this.state['filesarray'])) {
                    this.setState({ filesarray: newData, loading: false });
                    console.log("different data was received this time.")
                }

            })




    }

    //toggleModal() {
    //    this.setState({ isOpen: true });
    //}

    public render() {
        //if (this.state['showingPreview'] === true) {
        //    return(
        //        <div className="embed-responsive embed-responsive-16by9">
        //            <iframe className="embed-responsive-item" src={this.state['PreviewUrl']}></iframe>
        //        </div>
        //    );

        //}
        if (Object.keys(this.state['filesarray']).length > 0) { console.log("filesarray is not empty"); } else { console.log("filearray is empty"); }

        if (this.state['loading'] === false || Object.keys(this.state['filesarray']).length > 0) {

            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return (<Row key={row.ID} filename={row.fileName} size={row.size} lastModified={row.lastModified} downloadUrl={row.downloadUrl}></Row>);
            });

            return (
                <div className="well well-lg pull-down">
                    <div style={{ width: '100%', minHeight: '50px', backgroundColor: '#f5f5f5' }}>
                        <SearchBar />
                    </div>
                    <BreadCrumb address="Home" />
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
                </div>
            );
        }

        // determine if that loading is finished and render accordingly
        else
            return (
                <div className="loadingGif">
                    <LoadingGif />
                    <p>If this takes a long time to load</p>
                    <p>please ensure you've logged in to your provider.</p>
                    <p> You can login <NavLink to={"/login"}>here</NavLink>.</p>
                </div>
            );
    }
}