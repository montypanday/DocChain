import * as React from 'react';
import { render } from 'react-dom';
import { LoadingGif } from '../components/loadingGif';
import { SearchBar } from '../components/SearchBar';
import { Row } from '../components/Row';
import { BreadCrumb } from '../components/BreadCrumb';



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

            showingPreview: false,

            PreviewUrl: ""
        }

    }

    componentWillMount() {
        // this is the network call made everytime the page is reload, before the render method.
        fetch("/api/Login/GetBoxFiles/?token=" + sessionStorage.getItem("OAuthSession"))
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

        if (this.state['loading'] === false) {

            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return (<Row key={row.ID} filename={row.fileName} size={row.size} lastModified={row.lastModified} downloadUrl={row.downloadUrl}></Row>);
            });
        }

        // determine if that loading is finished and render accordingly



        return (
            <div >
                <div style={{ width: '100%', minHeight: '50px', backgroundColor: '#fcfcfc' }}>
                    <SearchBar />
                </div>
                <BreadCrumb />
                <table className="table table-striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th></th>
                            <th>Status</th>
                            <th>Size </th>
                            <th>Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                        {this.state['loading'] ? (<LoadingGif/>):(null)}
                    </tbody>
                </table>

            </div>
        );
    }
}