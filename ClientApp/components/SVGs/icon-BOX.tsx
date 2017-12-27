﻿import * as React from "react";
require('./icons.css');

export class BOXIcon extends React.Component {

    public render() {
        return <div className="icon">
            <svg viewBox="0 0 24 20" version="1.1" width="2em" height="1.4em">
                <path fill="#ffffff" d=" M 1 5.40625 C 0.398438 5.40625 0 5.804688 0 6.40625 L 0 15 C 0 17.699219 2.300781 20 5 20 C 6.898438 20 8.601563 18.914063 9.5 17.3125 C 10.398438 18.914063 12 20 14 20 C 16.800781 20 19 17.699219 19 15 C 19 12.199219 16.800781 9.90625 14 9.90625 C 12.101563 9.90625 10.398438 10.992188 9.5 12.59375 C 8.699219 10.992188 7 9.90625 5 9.90625 C 3.898438 9.90625 2.800781 10.304688 2 10.90625 L 2 6.40625 C 2 5.90625 1.5 5.40625 1 5.40625 Z M 18.75 9.84375 C 18.625 9.871094 18.507813 9.925781 18.40625 10 C 18.007813 10.300781 17.886719 11.007813 18.1875 11.40625 L 20.8125 14.90625 L 18.1875 18.40625 C 17.886719 18.804688 18.007813 19.511719 18.40625 19.8125 C 18.804688 20.113281 19.511719 19.992188 19.8125 19.59375 L 22 16.59375 L 24.1875 19.59375 C 24.488281 19.992188 25.195313 20.113281 25.59375 19.8125 C 25.992188 19.511719 26.113281 18.804688 25.8125 18.40625 L 23.1875 14.90625 L 25.8125 11.40625 C 26.113281 11.007813 25.992188 10.300781 25.59375 10 C 25.195313 9.699219 24.488281 9.789063 24.1875 10.1875 L 22 13.1875 L 19.8125 10.1875 C 19.585938 9.886719 19.128906 9.765625 18.75 9.84375 Z M 5 12 C 6.601563 12 8 13.398438 8 15 C 8.101563 16.601563 6.699219 18 5 18 C 3.300781 18 2 16.601563 2 15 C 2 13.300781 3.398438 12 5 12 Z M 14 12 C 15.699219 12 17 13.398438 17 15 C 17 16.601563 15.601563 18 14 18 C 12.300781 18 11 16.601563 11 15 C 11 13.300781 12.398438 12 14 12 Z "/></svg>
        </div>
    }
}