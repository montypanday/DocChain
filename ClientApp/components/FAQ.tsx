import * as React from "react";

interface FAQProp {

}
interface FAQState {

}
const pstyle = {
    paddingTop:"40px",
    paddingBottom: "40px",
    "width" : "auto"
};
const big_font = {
    fontSize: "27px",
    marginBottom: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "20px"

};
const sizing = {
    "width" : "auto"
};
export class Faq extends React.Component<FAQProp, FAQState> {

    public render() {

        return <div >
            <div className="container" style={pstyle}>
                <div className="container" style={sizing}>
                    <div className="panel-group" id="accordion">

                        <div className="faqHeader" style={big_font}>General questions</div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                                    What <strong>LINCD.com</strong> can do?
                        </a></h4>
                            </div>
                            <div id="collapseOne" className="panel-collapse collapse in">
                                <div className="panel-body">
                                    <strong>LINCD.com</strong> aims to introduce Blockchain technology to current cloud storage users.
                          <br />By combining LINCD blockchain and cloud storage, <strong>LINCD.com</strong> could allow users to calculate and store the hash of documents in Blockchain and retrieve it in future to check with their documents or to prove existence.
                        </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                                    Which form of files can be previewed on the <strong>LINCD.com</strong>?
                        </a></h4>
                            </div>
                            <div id="collapseTwo" className="panel-collapse collapse">
                                <div className="panel-body">
                                    Only doument file can be previewed, including doc \ docx \ ppt \ ppts \ xls \ xlsx \ txt \ pdf.
                        </div>
                            </div>
                        </div>


                        <div className="faqHeader" style={big_font}>Main Function</div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                                    how to login?
                        </a></h4>
                            </div>
                            <div id="collapseThree" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <strong>LINCD.com</strong> provide link service to 4 cloud storage providers: OneDrive, Google Drive, Dropbox, Box.
                          <ul>
                                        <li>Click the Login and choose your storage providers.</li>
                                        <li>Follow the guide and permit the <strong>LINCD.com</strong>'s requirement of managing files in your storage.</li>
                                        <li>Turn to the <strong>File Explorer</strong>.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour">
                                    File uploading, rename, copy and delete.
                        </a></h4>
                            </div>
                            <div id="collapseFour" className="panel-collapse collapse">
                                <div className="panel-body">
                                    File function of <strong>LINCD.com</strong> is provided by <strong>Box.com</strong>.
                          <br />Please check at: <a href="https://community.box.com/t5/Get-Started-Guide-for-New-Users/tkb-p/GettingStartedToolkit">Get Started Guide for New Users</a>
                        </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFive">
                                    How to embed my file into blockchain? (unfinished)
                        </a></h4>
                            </div>
                            <div id="collapseFive" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <ul>
                                        <li>Turn to <strong>Embed into Blockchain</strong>.</li>
                                        <li>Select files you want to link to the Blockchain</li>
                                        <li>Click the button "Embed"</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSix">
                                    How to access to delete files? (unfinished)
                        </a></h4>
                            </div>
                            <div id="collapseSix" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <ul>
                                        <li>Turn to <strong>Match with Blockchain</strong>.</li>
                                        <li>Select files you want to check</li>
                                        <li>Click the button "Match"</li>
                                        <li>If the file is not matched, there would be a alarm message.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven">
                                    How to logout/change the cloud drive? (unfinished)
                        </a></h4>
                            </div>
                            <div id="collapseSeven" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <ul>
                                        <li>Turn to <strong>Home</strong>.</li>
                                        <li>Click the button "Logout"</li>
                                        <li>Turn to <strong>Login</strong>.</li>
                                        <li>Change to the other cloud Drive Provider</li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className="faqHeader" style={big_font}>Error handling</div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseEight">
                                    Why there is an error when I access to <strong>File Explorer</strong>? (unfinished)
                        </a></h4>
                            </div>
                            <div id="collapseEight" className="panel-collapse collapse">
                                <div className="panel-body">
                                    unfinished
                        </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseNine">
                                    Why there is an error when I access to <strong>Embed into Blockchain</strong>? (unfinished)
                        </a></h4>
                            </div>
                            <div id="collapseNine" className="panel-collapse collapse">
                                <div className="panel-body">
                                    unfinished
                        </div>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title"><a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTen">
                                    Why there is an error when I access to <strong>Match with Blockchain</strong>? (unfinished)
                        </a></h4>
                            </div>
                            <div id="collapseTen" className="panel-collapse collapse">
                                <div className="panel-body">
                                    unfinished
                        </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>;
    }
}
