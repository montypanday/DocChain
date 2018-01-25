import * as React from "react";

export interface AppProps {
    direction: string,
    title: string,
    content: string,
    id: string,
    position: {x, y},
}

export interface AppState {
    direction: string,
    title: string,
    content: string,
    id: string,
    position: { x, y },
}

export class Guide extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            direction: props.direction,
            title: props.title,
            content: props.content,
            id: props.id,
            position: props.position,
        };
    }

    render() {
        const stylesheet = {
            left: this.state.position.x,
            top: this.state.position.y,
            zindex: 1,
        }

        return (
            <div className={"tooltip-container hidden " + this.state.direction} id={this.state.id} style={stylesheet} >
                <div className="tooltip-content">
                    <b><h4>{this.state.title}</h4></b>
                    <span>{this.state.content}</span>
                </div>
                <s><i></i></s>
            </div>

        );
    }

}



//<div className="tooltip" role="tooltip">
//    <div className="tooltip-arrow"></div>
//    <div className="tooltip-inner">aaaaaaa</div>
//</div>


//<div className="target"
//    data-toggle="tooltip"
//    data-html="true"
//    data-placement={this.state.title}
//    title={this.state.title}
//    style={stylesheet}
//>
//    <br />
//    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
//                <br />
//</div>