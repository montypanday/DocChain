import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>front_end</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/counter' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Counter
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/fetchdata' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/fileexplorer'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> File Explorer
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/contentpicker'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Content Picker
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/contentpreview'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Content Preview
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/contenttree'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Content Tree
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/contentuploader'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Content Uploader
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/login'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
