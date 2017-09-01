import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { contentPicker } from './components/contentPicker';
import { fileExplorer } from './components/fileExplorer';
import { Login } from './components/login';
import { Logout } from './components/logout';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/fileexplorer' component={fileExplorer} />
    <Route path='/contentpicker' component={contentPicker} />
    <Route path='/login/:state?/:code?' component={(props) => <Login {...props} code="haha" />} />
    <Route path='/logout' component={Logout} />
</Layout>;

