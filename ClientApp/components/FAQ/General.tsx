import * as React from "react";
import { About } from './General/gAbout';
import { FileTypes } from './General/gFileTypes';

const big_font = {
    fontSize: "27px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "20px",
    marginTop: "20px"

};

export class FaqGeneral extends React.Component<{}, {}>{



    public render() {
        return <div>
            <div className="faqHeader" style={big_font}>General FAQ</div>
            <About />
            <FileTypes />
            </div>;
    }
}