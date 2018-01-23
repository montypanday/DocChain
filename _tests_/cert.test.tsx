import * as React from "react";
import { CertDrawer } from "../clientapp/components/explorers/certdrawer";
import { CertPop } from "../clientapp/components/explorers/certpop";
import * as renderer from "react-test-renderer";
import * as ReactTestUtils from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom'

const init = () => {

    const props = {
        showCert: false,
    }

    const component = renderer.create(
        <div>
            <CertDrawer {...props}></CertDrawer>
            <CertPop></CertPop>
        </div>,
    );

    return component;
}

describe("Cert changes the class when hovered", () => {
    const certGroup = init();

    it('Clicked', () => {
        ReactTestUtils.Simulate.click(certGroup);
        let tree = certGroup.toJSON();
        expect(tree).toMatchSnapshot();
    });

});