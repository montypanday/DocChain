import * as React from "react";
import { FaqGeneral } from '../FAQ/General';
import { FaqFunctionality } from '../FAQ/Functionality';
import { FaqErrors} from '../FAQ/Errors';

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
                        <FaqGeneral />
                        <FaqFunctionality />
                        <FaqErrors/>
                    </div>
                </div>
            </div>
        </div>;
    }
}
