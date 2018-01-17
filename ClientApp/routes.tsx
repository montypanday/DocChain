import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home/Home";
import { contentPicker } from "./components/Box Original/contentPicker";
import { fileExplorer } from "./components/Box Original/fileExplorer";
import { Login } from "./components/Navbar/login";
import { Logout } from "./components/Utils/logout";
import { contentChecker } from "./components/Box Original/contentChecker";
import { Tutorial1 } from "./components/Home/tutorial1";
import { Tutorial2 } from "./components/Home/tutorial2";
import { Tutorial3 } from "./components/Home/tutorial3";
import { Tutorial4 } from "./components/Home/tutorial4";
import { Tutorial5 } from "./components/Home/tutorial5";
import { Faq } from "./components/Navbar/FAQ";
import { Explorer } from "./components/Explorers/Explorer";
import { DriveExplorer } from "./components/Explorers/DriveExplorer";
import { DriveLogin } from "./components/Explorers/DriveLogin";
import { BoxLogin } from "./components/Explorers/BoxLogin";

export const routes = <Layout>

    <Route exact path="/" component={Home} />
    <Route path="/fileexplorer" component={fileExplorer} />
    <Route path="/contentpicker" component={contentPicker} />
    <Route path="/contentChecker" component={contentChecker} />
    <Route path="/tutorial1" component={Tutorial1} />
    <Route path="/tutorial2" component={Tutorial2} />
    <Route path="/tutorial3" component={Tutorial3} />
    <Route path="/tutorial4" component={Tutorial4} />
    <Route path="/tutorial5" component={Tutorial5} />
    <Route path="/Login/:state?/:code?" component={(props) => <Login {...props} code="haha" />} />
    <Route path="/logout" component={Logout} />
    <Route path="/faq" component={Faq} />
    <Route path="/explorer" component={Explorer} />
    <Route path="/driveExplorer" component={DriveExplorer} />
    <Route path="/driveLogin" component={DriveLogin} />
    <Route path="/boxLogin" component={BoxLogin} />

</Layout>;

