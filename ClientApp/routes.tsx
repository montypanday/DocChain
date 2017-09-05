import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import { contentPicker } from './components/contentPicker';
import { contentPreview } from './components/contentPreview';
import { contentTree } from './components/contentTree';
import { contentUploader } from './components/contentUploader';
import { fileExplorer } from './components/fileExplorer';




export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/fileexplorer' component={fileExplorer} />
    <Route path='/contentpicker' component={contentPicker} />
    <Route path='/contentpreview' component={contentPreview} />
    <Route path='/contenttree' component={contentTree} />
    <Route path='/contentuploader' component={contentUploader} />
</Layout>;
