import * as React from "react";
import { Embedding } from './Functionality/fEmbedding';
import { FileInteractions } from './Functionality/fFileInteraction';
import { Login } from './Functionality/fLogin';
import { Logout } from './Functionality/fLogoutandSwitch';

const big_font = {
    fontSize: "27px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "20px",
    marginTop: "20px"
};

export class FaqFunctionality extends React.Component<{}, {}>{

    public render() {
        return <div>
            <div className="faqHeader" style={big_font}>Functionality</div>
            <Login/>
            <FileInteractions />
            <Embedding />
            <Logout/>      
        </div>;
    }
}