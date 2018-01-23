import * as React from "react";
import { ButtonToolBar } from "../ClientApp/components/Table";
import * as renderer from "react-test-renderer";

test("Link changes the class when hovered", () => {
    const folderHandler = jest.fn();
    const uploadHandler = jest.fn();
    const component = renderer.create(
        <ButtonToolBar
            NewFolderHandler={this.folderHandler}
            uploadHandler={this.uploadHandler}
        >
        </ButtonToolBar>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});