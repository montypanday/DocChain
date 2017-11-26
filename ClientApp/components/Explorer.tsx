import * as React from 'react';
import { render } from 'react-dom';



export class Explorer extends React.Component<{}, {}> {
    constructor() {
        super();
        this.state = {
            // This is space we will put the json response
            filesarray: {},

            // this is just true or false, determines whether the network request has finished, display a gif or a table
            loading: true
        }

    }

    componentWillMount() {
        // this is the network call made everytime the page is reload, before the render method.
        fetch("/api/Login/GetBoxFiles/?token=" + sessionStorage.getItem("OAuthSession"))
            .then(response => response.json())
            .then(data => {
                // console messages in order to help you understand what's happening
                console.log(data);
                this.setState({ filesarray: data, loading: false });
                console.log("this is filearray->>>   " + JSON.stringify(this.state['filesarray']['10']));
            });

    }
    
    public render() {
        if (this.state['loading'] === false) {

            // this .map function is like a foreach loop on filesarray, gives us a row object which has all the values that are related to a file object
            //rows is the variable which is being inserted into the render function at its given function see {rows} in render method.
            var rows = this.state['filesarray'].map(function (row) {
                return <tr>
                    <td className="col-md-6 col-md-pull-1">{row.fileName}</td>
                    <td className="col-md-1 col-md-pull-2">{row.size}</td>
                    <td className="col-md-3 col-md-pull-3">{row.lastModified}</td>
                </tr>
            });
        }

        // determine if that loading is finished and render accordingly
        if (this.state['loading'] === true) {
            return (<img src="dist/loading.gif" />);
        }
        else {
            return (
                <div>
                    <table className="table table-striped table-bordered table-hover table-responsive">
                        <thead>
                            <tr>
                                <th className="col-md-6 col-md-pull-1">File</th>
                                <th className="col-md-1 col-md-pull-2">Size</th>
                                <th className="col-md-3 col-md-pull-3">Last modified</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {rows}
                        </tbody>
                    </table>
                    
                </div>
            );
        }


     

        //<div id="myModal" className="modal fade" role="dialog">
        //    <div className="modal-dialog">


        //        <div className="modal-content">
        //            <div className="modal-header">
        //                <button type="button" className="close" data-dismiss="modal">&times;</button>
        //                <h4 className="modal-title">Modal Header</h4>
        //            </div>
        //            <div className="modal-body">
        //                <p>Some text in the modal.</p>
        //            </div>
        //            <div className="modal-footer">
        //                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        //            </div>
        //        </div>

        //    </div>
        //</div>
    }
}