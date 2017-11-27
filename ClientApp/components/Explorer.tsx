import * as React from 'react';
import { render } from 'react-dom';


var imageStyle = {
    'width': '100%',
    'textAlign': 'center',
    'paddingTop': '90px'
}

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

            PreviewUrl : ""
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
        if (this.state['showingPreview'] === true) {
            return(
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={this.state['PreviewUrl']}></iframe>
                </div>
            );  

        }

        if (this.state['loading'] === false) {

            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return <tr>
                    <td className="col-md-6 col-md-pull-1">{row.fileName}</td>
                    <td className="col-md-1 col-md-pull-2">{row.size}</td>
                    <td className="col-md-3 col-md-pull-3">{row.lastModified}</td>
                    <td className="col-md-3 col-md-pull-3">
                        <div className="dropdown">
                            <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Options
                            <span className="caret"></span></button>
                            <ul className="dropdown-menu">
                                <i className="fa fa-download" aria-hidden="true"></i><li><a href={row.downloadUrl} download>Download</a></li>
                                <li><a href="#" >Preview</a></li>
                                <li><a href="#">JavaScript</a></li>
                                <li className="divider"></li>
                                <li><a href="#">About Us</a></li>
                            </ul>
                        </div>
                    </td>
                </tr>
            });
        }

        // determine if that loading is finished and render accordingly
        if (this.state['loading'] === true ) {
            return (<div style={imageStyle}><img src="dist/loading-animations-preloader-gifs-ui-ux-effects-18.gif" /></div>);
        }
        else {
            if (this.state['errorFound'] === true) {
                return (
                    <div>this.state['errorMessage']</div>);
            }
            else {
                return (
                    <div >
                        <table className="table table-striped table-bordered table-hover table-responsive">
                            <tbody>
                                {rows}
                            </tbody>
                        </table>

                    </div>
                );
            }

        }
    }
}