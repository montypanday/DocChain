import * as React from "react";
import { Embed } from './Errors/eEmbed';
import { FileExplorer } from './Errors/eFileExplorer';
import { Match } from './Errors/eMatch';

const big_font = {
    fontSize: "27px",
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "20px",
    marginTop: "20px"
};

export class FaqErrors extends React.Component<{}, {}>{

    public render() {
        return <div>
            <div className="faqHeader" style={big_font}>Common Issues</div>
            <Embed />
            <FileExplorer />
            <Match />
        </div>;
    }
}