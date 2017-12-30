import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { GDIcon } from '../components/SVGs/icon-GD';
import { BOXIcon } from '../components/SVGs/icon-BOX';
import { ODIcon } from '../components/SVGs/icon-OD';
import { DBIcon } from '../components/SVGs/icon-DB';
import { HELPIcon } from '../components/SVGs/icon-HELP';
import { LOGINIcon } from '../components/SVGs/icon-LOGIN';
import { HOMEIcon } from '../components/SVGs/icon-HOME';

require('../components/Navbar (WIP)/Navbar.css');

export class NavMenu extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
        this.state = {
            boxSigned: false,
            googleSigned: false
        }
    }
    public render() {
        console.log("NavMenu was rendered");
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
                                <HOMEIcon/> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/explorer"} activeClassName="active">
                                <BOXIcon/> <div className="LinkText">Box</div>                                
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/driveExplorer"} activeClassName="active">
                                <GDIcon /> <div className="LinkText">Google Drive</div>  
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to={"/#"} activeClassName="active">
                                <ODIcon /> <div className="LinkText">OneDrive</div> 
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to={"/#"} activeClassName="active">
                                <DBIcon /> <div className="LinkText">Dropbox</div> 
                            </NavLink>

                        </li>

                        <li>
                            <NavLink to={"/faq"} activeClassName="active">
                                <HELPIcon/> FAQ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/Login"} activeClassName="active">
                                <LOGINIcon /> Account
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/fileexplorer"} activeClassName="active">
                                <i className="fa fa-question-circle" aria-hidden="true"></i> Box Explorer
                            </NavLink>
                        </li>
 
                    </ul>
                </div>
            </div>
        </div>;
    }
}
