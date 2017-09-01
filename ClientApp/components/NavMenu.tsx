import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {

        var placeholder;
        if (sessionStorage.getItem('accessToken') == null) {
            placeholder = <li>
                <NavLink to={'/login'} activeClassName='active'>
                    <span className='glyphicon glyphicon-user'></span> Login
                            </NavLink>
            </li>;
        }
        else {
            placeholder = <li>
                <NavLink to={'/logout'} activeClassName='active'>
                    <span className='glyphicon glyphicon-user'></span> Logout
                            </NavLink>
            </li>;
        }

        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>Lincd Blockchain</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={'/'} exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
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
                        {
                            placeholder
                        }
                    </ul>
                </div>
            </div>
        </div>;
    }
}
