import * as React from "react";
import { Link, NavLink } from "react-router-dom";

export class NavMenu extends React.Component<{}, {}> {
    constructor() {
        super();
        this.updateNavBar = this.updateNavBar.bind(this);
        this.state = {
            boxSigned: false,
            googleSigned: false
        }
    }
    updateNavBar() {
        console.log("updating Nav bar");
        if (sessionStorage.getItem("box_access_token") != null && this.state["boxSigned"] == false)
        {
            this.setState({ boxSigned: true });
        }
        if (sessionStorage.getItem("google_access_token") != null && this.state['googleSigned'] == false)
        {
            this.setState({ googleSigned: true });
        }
    }

    componentDidMount() {
        setInterval(this.updateNavBar,500);
    }
    public render() {
        return <div className="main-nav">
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to={"/"}>DocChain</Link>
                </div>

                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <NavLink to={"/"} exact activeClassName="active">
                                <i className="fa fa-home" aria-hidden="true"></i> Home
                            </NavLink>
                        </li>
                        {this.state['boxSigned'] == true &&
                                <li>
                                    <NavLink to={"/explorer"} activeClassName="active">
                                        <i className="fa fa-folder-open-o" aria-hidden="true"></i> Box
                            </NavLink>

                                </li>
                        }
                        {
                            this.state['googleSigned'] == true &&
                            <li>
                                <NavLink to={"/driveExplorer"} activeClassName="active">
                                    <i className="fa fa-folder-open-o" aria-hidden="true"></i> Google Drive
                            </NavLink>

                            </li>
                        }
                        <li>
                            <NavLink to={"/faq"} activeClassName="active">
                                <i className="fa fa-question-circle" aria-hidden="true"></i> FAQ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Login"} activeClassName="active">
                                <i className="fa fa-sign-in" aria-hidden="true"></i> Account
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
