import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Logout } from "./components/Utils/logout";
import { Explorer } from "./components/Explorers/Explorer";
import { DriveExplorer } from "./components/Explorers/DriveExplorer";
import { DriveLogin } from "./components/Explorers/DriveLogin";
import { BoxLogin } from "./components/Explorers/BoxLogin";

export const routes = <Layout>
    <Route exact path="/" component={ Home } />
    <Route path="/logout" component={Logout} />
    <Route path="/explorer" component={Explorer} />
    <Route path="/driveExplorer" component={DriveExplorer} />
    <Route path="/driveLogin" component={DriveLogin} />
    <Route path="/boxLogin" component={BoxLogin} />
</Layout>;

