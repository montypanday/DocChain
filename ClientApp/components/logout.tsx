import * as React from 'react';
export class Logout extends React.Component<{}, {}>
{
    constructor() {
        super();
    }

    render() {
        sessionStorage.removeItem('accessToken');
        return null;
    }
}