import * as React from "react";
import { Link, NavLink } from "react-router-dom";

export class NavMenu extends React.Component<{}, {}> {
    public render() {

        var placeholder;
        if (sessionStorage.getItem("accessToken") == null) {
            placeholder = <li>
                <NavLink to={"/Login"} activeClassName="active">
                    <span className="glyphicon glyphicon-user"></span> Login
                            </NavLink>
            </li>;
        } else {
            placeholder = <li>
                <NavLink to={"/logout"} activeClassName="active">
                    <span className="glyphicon glyphicon-user"></span> Logout
                            </NavLink>
            </li>;
        }

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
                                <span className="glyphicon glyphicon-home"></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/fileexplorer"} activeClassName="active">
                                <span className="glyphicon glyphicon-th-list"></span> Box Explorer
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/explorer"} activeClassName="active">
                                <span className="glyphicon glyphicon-th-list"></span> Explorer
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to={"/faq"} activeClassName="active">
                                <span className="glyphicon glyphicon-th-list"></span> FAQ
                            </NavLink>

                        </li>

                        {
                            placeholder
                        }

                    </ul>
                </div>
            </div>
        </div>;
    }
}
