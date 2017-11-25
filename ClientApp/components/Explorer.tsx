import * as React from 'react';
import { render } from 'react-dom';



export class Explorer extends React.Component<{}, {}> {
    constructor() {
        super();
        this.state = {
            filesarray: [],
            loading: true
        }
        
    }

    componentWillMount() {
        fetch("/api/Login/GetBoxFiles/?token=" + sessionStorage.getItem("OAuthSession"))
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ filesarray: data, loading: false });
                console.log("this is filearray" + this.state);
            });
        
    }
    public render() {
        
        return (
            <table>
                <tbody>
                    
                </tbody>
            </table>
        );
    }
}