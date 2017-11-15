import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { contentPicker } from './components/contentPicker';
import { fileExplorer } from './components/fileExplorer';
import { Login } from './components/login';
import { Logout } from './components/logout';
import { contentChecker } from './components/contentChecker';
import { Tutorial1 } from './components/tutorial1';
import { Tutorial2 } from './components/tutorial2';
import { Tutorial3 } from './components/tutorial3';
import { Tutorial4 } from './components/tutorial4';
import { Tutorial5 } from './components/tutorial5';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/fileexplorer' component={fileExplorer} />
    <Route path='/contentpicker' component={contentPicker} />
    <Route path='/contentChecker' component={contentChecker} />
    <Route path='/tutorial1' component={Tutorial1} />
    <Route path='/tutorial2' component={Tutorial2} />
    <Route path='/tutorial3' component={Tutorial3} />
    <Route path='/tutorial4' component={Tutorial4} />
    <Route path='/tutorial5' component={Tutorial5} />
    <Route path='/login/:state?/:code?' component={(props) => <Login {...props} code="haha" />} />
    <Route path='/logout' component={Logout} />
</Layout>;

