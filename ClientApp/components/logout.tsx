import * as React from "react";
export class Logout extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    render() {
        sessionStorage.removeItem("accessToken");
        return null;
    }
}