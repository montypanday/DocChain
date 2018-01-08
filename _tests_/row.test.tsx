

import * as React from 'react';
import { Row } from '../ClientApp/components/Table/Row';
import * as renderer from 'react-test-renderer';


test('Link changes the class when hovered', () => {
    const testnavHandler = jest.fn();
    const test_delete_hanler = jest.fn();
    const component = renderer.create(
        <Row filename="sample folder"
            id="43970020269"
            lastModified="1/01/2018 6:46:08 PM"
            mimeType=""
            size="28528"
            type="folder"
            key="43970020269"
            navHandler={testnavHandler}
            deleteHandler={test_delete_hanler}
            renameHandler=""
            shareLinkHandler="" 
        ></Row>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();




    //// manually trigger the callback
    //tree.props.onMouseEnter();
    //// re-rendering
    //tree = component.toJSON();
    //expect(tree).toMatchSnapshot();

    //// manually trigger the callback
    //tree.props.onMouseLeave();
    //// re-rendering
    //tree = component.toJSON();
    //expect(tree).toMatchSnapshot();
});