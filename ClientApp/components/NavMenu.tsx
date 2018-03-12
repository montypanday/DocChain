import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { ODIcon, DBIcon, HELPIcon, LOGINIcon, HOMEIcon, ChainIcon } from "./svg";
const iconStyle = { color: "#fff", textShadow: "1px 1px 1px #ccc" }
const fontDesign ={
    fontSize: "1.3em"
}
export class NavMenu extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
 
 
    public render() {

        return <div className="main-nav" >
            <div className="navbar navbar-inverse" style={{
                backgroundImage: "url(dist/menu_background.jpg)", backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to={"/"}><ChainIcon/>DocChain</Link>
                </div>
                <div className='clearfix'></div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li>
                            <NavLink to={"/"} exact activeClassName="active" style={fontDesign}>
                                <i className="fa fa-home" aria-hidden="true" style={iconStyle}></i> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/explorer"} activeClassName="active" style={fontDesign}>
                                <i className="fa fa-cloud" aria-hidden="true" style={iconStyle}></i> Box

                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/driveExplorer"} activeClassName="active" style={fontDesign}>
                                <i className="fa fa-cloud" aria-hidden="true" style={iconStyle}></i> Google Drive
                            </NavLink>

                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}



