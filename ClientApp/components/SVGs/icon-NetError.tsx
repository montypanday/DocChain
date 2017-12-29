import * as React from "react";

export class NetError extends React.Component {

    public render() {
        return <div className="errorIcon">
            <svg version="1.1" id="Layer_1" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
                <path fill="#6CBBFF" stroke="#333" stroke-width="20" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" d="M41,50h14c4.565,0,8-3.582,8-8s-3.435-8-8-8c0-11.046-9.52-20-20.934-20C23.966,14,14.8,20.732,13,30c0,0-0.831,0-1.667,0C5.626,30,1,34.477,1,40s4.293,10,10,10H41"/>
                <line fill="none" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" stroke-miterlimit="10" x1="39" y1="41" x2="25" y2="27" />
                <line fill="none" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" stroke-miterlimit="10" x1="25" y1="41" x2="39" y2="27" />
            </svg>
        </div>
    }
}