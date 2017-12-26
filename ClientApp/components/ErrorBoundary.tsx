import * as React from 'react';

export interface EBState {
    hasError: boolean
    //Error: any
}
export interface EBProps {

}

export default class ErrorBoundary extends React.Component<EBProps, EBState> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state["hasError"]) {
            // You can render any custom fallback UI
            return (<h1>Something went wrong</h1>);
        }
        return this.props.children;
    }
}
