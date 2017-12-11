import * as React from 'react';
import { render } from 'react-dom';
import { LoadingGif } from '../components/loadingGif';
import { SearchBar } from '../components/SearchBar';
import { Row } from '../components/Row';
import { BreadCrumb } from '../components/breadCrumb';
import { Link, NavLink, Redirect } from "react-router-dom";
//import * as ReactBootstrap from 'react-bootstrap';
//var Modal = ReactBootstrap.Modal;


export class DriveExplorer extends React.Component<{}, {}> {

    constructor() {
        super();

        this.state = {
            // This is space we will put the json response
            filesarray: {},

            // this is just true or false, determines whether the network request has finished, display a gif or a table
            loading: true,

            errorFound: false,

            errorMessage: "",

            showingPreview: false,

            PreviewUrl: ""
        }

    }

    componentDidMount() {
        // this is the network call made everytime the page is reload, before the render method.
        fetch("/api/Login/GetGoogleSession?google_access_token=" + sessionStorage.getItem("google_access_token") + "&google_refresh_token=" + sessionStorage.getItem("google_refresh_token"))
            .then(response => {
                if (!response.ok) { throw response }
                return response.json()  //we only get here if there is no error)
            })
            .then(data => {
                // console messages in order to help you understand what's happening
                //console.log(data);
                this.setState({ filesarray: data, loading: false });
                //console.log("this is filearray->>>   " + JSON.stringify(this.state['filesarray']['10']));
            })
    }

    showPreview() {
        this.setState({ showingPreview: true });
    }

    public render() {

        //if (this.state['showingPreview'] === true) {
        //    return(
        //        <div className="embed-responsive embed-responsive-16by9">
        //            <iframe className="embed-responsive-item" src={this.state['PreviewUrl']}></iframe>
        //        </div>
        //    );

        //}

        if (sessionStorage.getItem("google_access_token") == null) {
            return <Redirect to='/driveLogin' />

        } else if (this.state['loading'] === false) {

            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return (<Row key={row.ID} filename={row.fileName} size={row.size} lastModified={row.lastModified} downloadUrl={row.downloadUrl}></Row>);
            });

            return (
                <div className="well well-lg pull-down">
                    <BreadCrumb address="Home" />
                    <div style={{ width: '100%', minHeight: '50px', backgroundColor: '#f5f5f5' }}>
                        <SearchBar />
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
                </div>
            );
        } else
        // determine if that loading is finished and render accordingly
            return (
                <div className="loadingGif">
                    <LoadingGif />
                    <p>Loading...</p>
                </div>
            );
    }
}