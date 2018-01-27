/// <reference path="../clientapp/components/alerts/emptysearch.tsx" />
import * as React from "react";
import { EmptySearch } from "../clientapp/components/alerts/emptysearch";
import * as renderer from "react-test-renderer";
import * as ReactTestUtils from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom'

const init = () => {

    const props = {
        showCert: false,
    }

    const component = renderer.create(
        <EmptySearch />,
    );

    return component;
}

describe("whether the emptysearch is right rendered", () => {

    it('test', () => {
        const emptySearch = init();

        let tree = emptySearch.toJSON();
        expect(tree).toMatchSnapshot();
    });

});